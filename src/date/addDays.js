"use strict";

const toDateSafe = require("./toDateSafe");

/**
 * addDays(dateLike, days)
 * Soma dias preservando horário.
 *
 * @param {any} dateLike
 * @param {number} days
 * @returns {Date|null}
 */
function addDays(dateLike, days) {
  const d = toDateSafe(dateLike, null);
  if (!d) return null;

  const n = Number(days);
  if (!Number.isFinite(n)) return new Date(d.getTime());

  const out = new Date(d.getTime());
  out.setDate(out.getDate() + n);
  return out;
}

module.exports = addDays;
