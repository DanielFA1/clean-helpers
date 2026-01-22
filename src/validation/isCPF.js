"use strict";

const cleanDigits = require("../string/cleanDigits");

/**
 * isCPF(value)
 * Valida CPF com dígitos verificadores.
 *
 * @param {any} value
 * @returns {boolean}
 */
function isCPF(value) {
  const cpf = cleanDigits(value);
  if (cpf.length !== 11) return false;

  // rejeita sequências (000..., 111..., etc)
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const nums = cpf.split("").map((c) => Number(c));

  // dv1
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += nums[i] * (10 - i);
  let dv1 = (sum * 10) % 11;
  if (dv1 === 10) dv1 = 0;
  if (dv1 !== nums[9]) return false;

  // dv2
  sum = 0;
  for (let i = 0; i < 10; i++) sum += nums[i] * (11 - i);
  let dv2 = (sum * 10) % 11;
  if (dv2 === 10) dv2 = 0;

  return dv2 === nums[10];
}

module.exports = isCPF;
