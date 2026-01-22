"use strict";

const toNumberSafe = require("./toNumberSafe");

/**
 * clamp(value, min, max)
 * Garante que value fique entre min e max.
 *
 * @param {any} value
 * @param {any} min
 * @param {any} max
 * @returns {number}
 */
function clamp(value, min, max) {
  const v = toNumberSafe(value, 0);
  const a = toNumberSafe(min, 0);
  const b = toNumberSafe(max, 0);

  const lo = Math.min(a, b);
  const hi = Math.max(a, b);

  return Math.min(hi, Math.max(lo, v));
}

module.exports = clamp;
