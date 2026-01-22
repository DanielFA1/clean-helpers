"use strict";

const cleanDigits = require("../string/cleanDigits");

/**
 * isEAN13(value)
 * Valida EAN-13 (código de barras).
 *
 * @param {any} value
 * @returns {boolean}
 */
function isEAN13(value) {
  const s = cleanDigits(value);
  if (s.length !== 13) return false;
  if (!/^\d{13}$/.test(s)) return false;

  const digits = s.split("").map((c) => Number(c));
  const check = digits[12];

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * (i % 2 === 0 ? 1 : 3);
  }
  const dv = (10 - (sum % 10)) % 10;

  return dv === check;
}

module.exports = isEAN13;
