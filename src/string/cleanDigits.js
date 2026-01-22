"use strict";

/**
 * cleanDigits(value)
 * Remove tudo que não é dígito. Útil para CPF/CNPJ/telefone/CEP/EAN.
 *
 * @param {any} value
 * @returns {string}
 */
function cleanDigits(value) {
  return String(value ?? "").replace(/\D+/g, "");
}

module.exports = cleanDigits;
