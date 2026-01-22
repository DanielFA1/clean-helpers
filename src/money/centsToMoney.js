"use strict";

/**
 * centsToMoney(cents, opts)
 * 123456 -> 1234.56
 *
 * @param {any} cents
 * @param {object} [opts]
 * @param {number} [opts.decimals=2]
 * @returns {number}
 */
function centsToMoney(cents, opts = {}) {
  const decimals = Number.isFinite(opts.decimals) ? Math.max(0, Math.floor(opts.decimals)) : 2;
  const n = typeof cents === "number" ? cents : Number(cents);
  if (!Number.isFinite(n)) return 0;

  const factor = 10 ** decimals;
  return n / factor;
}

module.exports = centsToMoney;
