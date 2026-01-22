"use strict";

const toDateSafe = require("./toDateSafe");

/**
 * formatDateBR(dateLike)
 * Formata para "dd/mm/yyyy"
 *
 * @param {any} dateLike
 * @returns {string}
 */
function formatDateBR(dateLike) {
  const d = toDateSafe(dateLike, null);
  if (!d) return "";

  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear());

  return `${dd}/${mm}/${yy}`;
}

module.exports = formatDateBR;
