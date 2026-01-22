"use strict";

/**
 * quantile(arr, q)
 * Quantil com interpolação linear.
 *
 * @param {any[]} arr
 * @param {number} q (0..1)
 * @returns {number}
 */
function quantile(arr, q) {
  const xs = (Array.isArray(arr) ? arr : [])
    .map((v) => (typeof v === "number" ? v : Number(v)))
    .filter((v) => Number.isFinite(v))
    .sort((a, b) => a - b);

  if (xs.length === 0) return 0;

  const qq = Number.isFinite(q) ? q : 0.5;
  const p = Math.max(0, Math.min(1, qq));

  if (xs.length === 1) return xs[0];

  const idx = (xs.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);

  if (lo === hi) return xs[lo];

  const w = idx - lo;
  return xs[lo] * (1 - w) + xs[hi] * w;
}

module.exports = quantile;
