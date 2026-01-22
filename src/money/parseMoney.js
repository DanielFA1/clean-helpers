"use strict";

/**
 * @param {any} val
 * @param {object} [opts]
 * @param {boolean} [opts.strict=false] - Se true, retorna NaN ao invés de 0 quando inválido
 * @param {boolean} [opts.allowNegative=true]
 * @returns {number}
 */
function parseMoney(val, opts = {}) {
  const strict = !!opts.strict;
  const allowNegative = opts.allowNegative !== false;

  if (typeof val === "number") {
    return Number.isFinite(val) ? val : (strict ? NaN : 0);
  }

  let raw = String(val ?? "").trim();
  if (!raw) return strict ? NaN : 0;

  // Normaliza sinais unicode (–, −) para "-"
  raw = raw.replace(/[–−]/g, "-");

  // 1) Detecta negativo por parênteses envolvendo algo com dígito
  const negativeByParens = /\(\s*[^)]*\d[^)]*\)/.test(raw);

  // 2) Detecta hífen antes do primeiro dígito (ex: "R$ - 10,00")
  //    Se houver mais de 1 hífen antes do primeiro dígito ("--"), trata como ruído.
  const firstDigitIdx = raw.search(/\d/);
  let negativeByHyphen = false;
  if (firstDigitIdx >= 0) {
    const prefix = raw.slice(0, firstDigitIdx);
    const hyphenCount = (prefix.match(/-/g) || []).length;
    negativeByHyphen = hyphenCount === 1;
  }

  let negative = (negativeByParens || negativeByHyphen) && allowNegative;

  // Remove parênteses (não entram na limpeza numérica)
  raw = raw.replace(/[()]/g, "");

  // Mantém apenas dígitos e separadores (.,,)
  let s = raw.replace(/[^0-9.,]/g, "");
  if (!/[0-9]/.test(s)) return strict ? NaN : 0;

  const lastComma = s.lastIndexOf(",");
  const lastDot = s.lastIndexOf(".");
  let decSep = null;

  if (lastComma !== -1 && lastDot !== -1) {
    decSep = lastComma > lastDot ? "," : ".";
  } else if (lastComma !== -1) {
    const parts = s.split(",");
    if (parts.length === 2) {
      const decLen = (parts[1] || "").length;
      decSep = decLen >= 1 && decLen <= 2 ? "," : null;
    }
  } else if (lastDot !== -1) {
    const parts = s.split(".");
    if (parts.length === 2) {
      const decLen = (parts[1] || "").length;
      decSep = decLen >= 1 && decLen <= 2 ? "." : null;
    }
  }

  let intPart = "";
  let decPart = "";

  if (decSep) {
    const i = s.lastIndexOf(decSep);
    intPart = s.slice(0, i);
    decPart = s.slice(i + 1);
  } else {
    intPart = s;
  }

  intPart = intPart.replace(/[^\d]/g, "") || "0";
  decPart = decPart.replace(/[^\d]/g, "");

  const numStr = decPart ? `${intPart}.${decPart}` : intPart;
  let num = Number(numStr);

  if (!Number.isFinite(num)) return strict ? NaN : 0;
  if (negative) num = -num;

  return num;
}

module.exports = parseMoney;
