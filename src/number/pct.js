"use strict";

const toNumberSafe = require("./toNumberSafe");

/**
 * pct(part, total, decimals=2)
 * Retorna percentual (0..100) com proteção quando total=0.
 *
 * @param {any} part
 * @param {any} total
 * @param {number} [decimals=2]
 * @param {number} [fallback=0]
 * @returns {number}
 */
function pct(part, total, decimals = 2, fallback = 0) {
  const p = toNumberSafe(part, 0);
  const t = toNumberSafe(total, 0);

  if (!t) return fallback;

  const value = (p / t) * 100;

  if (!Number.isFinite(value)) return fallback;

  const d = Number.isFinite(decimals) ? decimals : 2;
  if (d <= 0) return Math.round(value);

  const factor = 10 ** d;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

module.exports = pct;
