"use strict";

const toNumberSafe = require("./toNumberSafe");

/**
 * roundTo(value, decimals=0)
 * Arredonda com estabilidade melhor para casos comuns.
 *
 * @param {any} value
 * @param {number} [decimals=0]
 * @returns {number}
 */
function roundTo(value, decimals = 0) {
  const v = toNumberSafe(value, 0);
  const d = Number.isFinite(decimals) ? decimals : 0;

  if (d <= 0) return Math.round(v);

  const factor = 10 ** d;
  // EPSILON ajuda em casos tipo 1.005 -> 1.01
  return Math.round((v + Number.EPSILON) * factor) / factor;
}

module.exports = roundTo;
