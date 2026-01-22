"use strict";

const isEmail = require("./isEmail");
const isCPF = require("./isCPF");
const isCNPJ = require("./isCNPJ");
const isPhoneBR = require("./isPhoneBR");
const isCEP = require("./isCEP");
const isEAN13 = require("./isEAN13");
const cleanDigits = require("../string/cleanDigits");

/**
 * pickValid(fields, opts)
 * Retorna o primeiro campo válido, com tipo e valor normalizado.
 *
 * Tipos suportados:
 * - cpf, cnpj, email, phone, cep, ean13
 *
 * @param {object} fields
 * @param {object} [opts]
 * @param {string[]} [opts.order] - ordem de prioridade
 * @returns {{ type: string, key: string, value: string } | null}
 */
function pickValid(fields, opts = {}) {
  const obj = fields && typeof fields === "object" ? fields : {};
  const order = Array.isArray(opts.order)
    ? opts.order
    : ["cpf", "cnpj", "email", "phone", "cep", "ean13"];

  const validators = {
    cpf: {
      fn: isCPF,
      norm: (v) => cleanDigits(v),
    },
    cnpj: {
      fn: isCNPJ,
      norm: (v) => cleanDigits(v),
    },
    email: {
      fn: isEmail,
      norm: (v) => String(v ?? "").trim().toLowerCase(),
    },
    phone: {
      fn: isPhoneBR,
      norm: (v) => cleanDigits(v),
    },
    cep: {
      fn: isCEP,
      norm: (v) => cleanDigits(v),
    },
    ean13: {
      fn: isEAN13,
      norm: (v) => cleanDigits(v),
    },
  };

  for (const type of order) {
    if (!validators[type]) continue;

    // aceita tanto fields[type] quanto um alias com chave diferente
    // ex: { email: "x@x.com" } ou { mail: "...", order: ["mail"] } -> não valida
    if (!(type in obj)) continue;

    const raw = obj[type];
    if (raw == null || String(raw).trim() === "") continue;

    const { fn, norm } = validators[type];
    if (fn(raw)) {
      return { type, key: type, value: norm(raw) };
    }
  }

  return null;
}

module.exports = pickValid;
