"use strict";

const toNumberSafe = require("./toNumberSafe");
const sum = require("./sum");

/**
 * avg(list, mapper?)
 * Média de números. Retorna 0 se lista vazia.
 *
 * @param {any[]} list
 * @param {(item:any, idx:number)=>any} [mapper]
 * @returns {number}
 */
function avg(list, mapper) {
  const arr = Array.isArray(list) ? list : [];
  if (arr.length === 0) return 0;

  const total = sum(arr, mapper);
  const mean = total / arr.length;

  return Number.isFinite(mean) ? mean : 0;
}

module.exports = avg;
