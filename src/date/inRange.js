"use strict";

const toDateSafe = require("./toDateSafe");

/**
 * inRange(dateLike, startLike, endLike, opts)
 * Verifica se date está entre start e end.
 *
 * @param {any} dateLike
 * @param {any} startLike
 * @param {any} endLike
 * @param {object} [opts]
 * @param {boolean} [opts.inclusive=true]
 * @returns {boolean}
 */
function inRange(dateLike, startLike, endLike, opts = {}) {
  const inclusive = opts.inclusive !== false;

  const d = toDateSafe(dateLike, null);
  const a = toDateSafe(startLike, null);
  const b = toDateSafe(endLike, null);

  if (!d || !a || !b) return false;

  const t = d.getTime();
  const lo = Math.min(a.getTime(), b.getTime());
  const hi = Math.max(a.getTime(), b.getTime());

  return inclusive ? t >= lo && t <= hi : t > lo && t < hi;
}

module.exports = inRange;
