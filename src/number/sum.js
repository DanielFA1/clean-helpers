"use strict";

const toNumberSafe = require("./toNumberSafe");

/**
 * sum(list, mapper?)
 * Soma números, ignorando inválidos via fallback 0.
 *
 * @param {any[]} list
 * @param {(item:any, idx:number)=>any} [mapper]
 * @returns {number}
 */
function sum(list, mapper) {
  const arr = Array.isArray(list) ? list : [];
  if (typeof mapper === "function") {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += toNumberSafe(mapper(arr[i], i), 0);
    }
    return total;
  }

  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += toNumberSafe(arr[i], 0);
  }
  return total;
}

module.exports = sum;
