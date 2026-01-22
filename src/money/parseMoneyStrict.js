"use strict";

/**
 * parseMoneyStrict(value, opts)
 * Parser estrito pra dinheiro:
 * - aceita "1.234,56", "1234.56", "R$ 1.234,56", "(1.234,56)", "-1.234,56"
 * - valida no máximo N casas decimais (padrão 2)
 * - retorna { ok, value, cents, reason }
 *
 * Regras de separador (pragmáticas):
 * - se tem '.' e ',' => último separador é decimal (o outro é milhar)
 * - se tem só ',' => ',' é decimal (BR)  ✅ (logo "1,234" => 3 decimais => inválido se decimals=2)
 * - se tem só '.' => se parecer milhar (1.234.567) vira inteiro; senão '.' é decimal
 *
 * @param {any} value
 * @param {object} [opts]
 * @param {number} [opts.decimals=2]
 * @param {boolean} [opts.allowNegative=true]
 * @returns {{ok:boolean, value:number, cents:number, reason?:string}}
 */
function parseMoneyStrict(value, opts = {}) {
  const decimals = Number.isFinite(opts.decimals) ? Math.max(0, Math.floor(opts.decimals)) : 2;
  const allowNegative = opts.allowNegative !== false;

  const fail = (reason) => ({ ok: false, value: 0, cents: 0, reason });

  // ---------- number ----------
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return fail("not_finite");

    const neg = value < 0;
    if (neg && !allowNegative) return fail("negative_not_allowed");

    const abs = Math.abs(value);
    const factor = 10 ** decimals;

    // checa se tem mais casas do que permitido (estrito)
    const scaled = abs * factor;
    const rounded = Math.round((abs + Number.EPSILON) * factor);
    if (Math.abs(scaled - rounded) > 1e-6) return fail("too_many_decimals");
    if (!Number.isSafeInteger(rounded)) return fail("too_large");

    const cents = neg ? -rounded : rounded;
    return { ok: true, value: cents / factor, cents };
  }

  // ---------- string ----------
  let raw = String(value ?? "").trim();
  if (!raw) return fail("empty");

  const parenNeg = /\(/.test(raw) && /\)/.test(raw);
  const signNeg = /^\s*-/.test(raw);
  const neg = parenNeg || signNeg;

  if (neg && !allowNegative) return fail("negative_not_allowed");

  // normaliza e mantém só dígitos + separadores
  raw = raw.replace(/\s|\u00A0/g, "");
  raw = raw.replace(/^[+-]/, "");
  raw = raw.replace(/[()]/g, "");
  raw = raw.replace(/[^0-9.,]/g, "");

  if (!raw || !/[0-9]/.test(raw)) return fail("no_digits");

  const hasComma = raw.includes(",");
  const hasDot = raw.includes(".");
  const commaCount = (raw.match(/,/g) || []).length;
  const dotCount = (raw.match(/\./g) || []).length;

  let intPartRaw = raw;
  let decPartRaw = "";

  const thousandsDotOnly = /^\d{1,3}(\.\d{3})+$/.test(raw); // ex: 1.234.567
  const thousandsCommaOnly = /^\d{1,3}(,\d{3})+$/.test(raw); // ex: 1,234,567 (não priorizado, mas detectável)

  if (hasComma && hasDot) {
    // último separador decide decimal
    const iComma = raw.lastIndexOf(",");
    const iDot = raw.lastIndexOf(".");
    const iSep = Math.max(iComma, iDot);

    intPartRaw = raw.slice(0, iSep);
    decPartRaw = raw.slice(iSep + 1);
  } else if (hasComma) {
    // BR-first: ',' é decimal (logo "1,234" é 3 decimais)
    if (commaCount !== 1) {
      // pode ser milhar com vírgula (en-US sem decimal), mas é ambíguo; mantenho estrito
      if (thousandsCommaOnly) return fail("ambiguous_thousands");
      return fail("invalid_format");
    }

    const i = raw.lastIndexOf(",");
    intPartRaw = raw.slice(0, i);
    decPartRaw = raw.slice(i + 1);
  } else if (hasDot) {
    // se for claramente milhar, vira inteiro
    if (thousandsDotOnly) {
      intPartRaw = raw;
      decPartRaw = "";
    } else {
      // senão '.' é decimal (en-US style)
      if (dotCount !== 1) return fail("invalid_format");
      const i = raw.lastIndexOf(".");
      intPartRaw = raw.slice(0, i);
      decPartRaw = raw.slice(i + 1);
    }
  }

  // limpa milhares
  const intPart = String(intPartRaw).replace(/[^\d]/g, "") || "0";
  let decPart = String(decPartRaw).replace(/[^\d]/g, "");

  if (decimals === 0) {
    if (decPart.length > 0) return fail("too_many_decimals");
    decPart = "";
  } else {
    if (decPart.length > decimals) return fail("too_many_decimals");
    while (decPart.length < decimals) decPart += "0";
  }

  // usa BigInt pra evitar overflow silencioso
  try {
    const factorBI = BigInt(10) ** BigInt(decimals);
    const centsAbs =
      BigInt(intPart) * factorBI + (decPart ? BigInt(decPart) : BigInt(0));

    if (centsAbs > BigInt(Number.MAX_SAFE_INTEGER)) return fail("too_large");

    const cents = Number(centsAbs) * (neg ? -1 : 1);
    const factor = 10 ** decimals;

    return { ok: true, value: cents / factor, cents };
  } catch {
    return fail("invalid_format");
  }
}

module.exports = parseMoneyStrict;
