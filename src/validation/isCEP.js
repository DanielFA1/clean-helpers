"use strict";

const cleanDigits = require("../string/cleanDigits");

/**
 * isCEP(value)
 * CEP: 8 dígitos.
 *
 * @param {any} value
 * @returns {boolean}
 */
function isCEP(value) {
  const d = cleanDigits(value);
  return /^\d{8}$/.test(d);
}

module.exports = isCEP;
