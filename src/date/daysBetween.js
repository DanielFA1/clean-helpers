"use strict";

const toDateSafe = require("./toDateSafe");
const startOfDay = require("./startOfDay");

/**
 * daysBetween(a, b)
 * Diferença em dias inteiros entre datas (b - a), ignorando horas.
 *
 * @param {any} a
 * @param {any} b
 * @returns {number}
 */
function daysBetween(a, b) {
  const d1 = startOfDay(toDateSafe(a, null));
  const d2 = startOfDay(toDateSafe(b, null));
  if (!d1 || !d2) return 0;

  const MS = 24 * 60 * 60 * 1000;
  return Math.round((d2.getTime() - d1.getTime()) / MS);
}

module.exports = daysBetween;
