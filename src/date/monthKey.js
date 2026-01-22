"use strict";

const toDateSafe = require("./toDateSafe");

/**
 * monthKey(dateLike)
 * Retorna "YYYY-MM" (ótimo pra agrupar faturamento mensal).
 *
 * @param {any} dateLike
 * @returns {string}
 */
function monthKey(dateLike) {
  const d = toDateSafe(dateLike, null);
  if (!d) return "";

  const y = String(d.getFullYear());
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

module.exports = monthKey;
