"use strict";

const cleanDigits = require("../string/cleanDigits");

/**
 * isPhoneBR(value)
 * Validação pragmática de telefone BR:
 * - 10 ou 11 dígitos (sem DDI)
 * - 12 ou 13 dígitos com DDI 55
 *
 * @param {any} value
 * @returns {boolean}
 */
function isPhoneBR(value) {
  const d = cleanDigits(value);

  // com DDI
  if (d.length === 12 || d.length === 13) {
    if (!d.startsWith("55")) return false;
    const rest = d.slice(2);
    return rest.length === 10 || rest.length === 11;
  }

  // sem DDI
  if (d.length === 10 || d.length === 11) return true;

  return false;
}

module.exports = isPhoneBR;
