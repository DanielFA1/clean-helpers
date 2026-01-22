"use strict";

const cleanDigits = require("../string/cleanDigits");

/**
 * isCEST(value)
 * CEST: 7 dígitos. (Validação pragmática)
 *
 * @param {any} value
 * @returns {boolean}
 */
function isCEST(value) {
  const d = cleanDigits(value);
  if (!/^\d{7}$/.test(d)) return false;
  if (/^(\d)\1{6}$/.test(d)) return false; // evita 0000000 etc
  return true;
}

module.exports = isCEST;
