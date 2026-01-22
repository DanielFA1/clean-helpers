"use strict";

const cleanDigits = require("../string/cleanDigits");

/**
 * isCNPJ(value)
 * Valida CNPJ com dígitos verificadores.
 *
 * @param {any} value
 * @returns {boolean}
 */
function isCNPJ(value) {
  const cnpj = cleanDigits(value);
  if (cnpj.length !== 14) return false;

  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  const nums = cnpj.split("").map((c) => Number(c));

  const calcDV = (baseLen) => {
    const weights = baseLen === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += nums[i] * weights[i];
    }
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const dv1 = calcDV(12);
  if (dv1 !== nums[12]) return false;

  const dv2 = calcDV(13);
  return dv2 === nums[13];
}

module.exports = isCNPJ;
