"use strict";

const toDateSafe = require("./toDateSafe");

/**
 * endOfDay(dateLike)
 * @param {any} dateLike
 * @returns {Date|null}
 */
function endOfDay(dateLike) {
  const d = toDateSafe(dateLike, null);
  if (!d) return null;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

module.exports = endOfDay;
