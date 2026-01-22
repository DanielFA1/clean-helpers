"use strict";

const toDateSafe = require("./toDateSafe");

/**
 * startOfDay(dateLike)
 * @param {any} dateLike
 * @returns {Date|null}
 */
function startOfDay(dateLike) {
  const d = toDateSafe(dateLike, null);
  if (!d) return null;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

module.exports = startOfDay;
