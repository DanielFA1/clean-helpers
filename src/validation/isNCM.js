"use strict";

const cleanDigits = require("../string/cleanDigits");

/**
 * isNCM(value)
 * NCM: 8 dígitos. (Validação pragmática)
 *
 * @param {any} value
 * @returns {boolean}
 */
function isNCM(value) {
  const d = cleanDigits(value);
  if (!/^\d{8}$/.test(d)) return false;
  if (/^(\d)\1{7}$/.test(d)) return false; // evita 00000000 etc
  return true;
}

module.exports = isNCM;
