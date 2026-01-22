"use strict";

const toDateSafe = require("./toDateSafe");

/**
 * formatBRDatetime(dateLike, opts)
 * Formata para "dd/mm/yyyy HH:mm" (padrão BR).
 *
 * @param {any} dateLike
 * @param {object} [opts]
 * @param {boolean} [opts.withSeconds=false] - inclui ":ss"
 * @returns {string}
 */
function formatBRDatetime(dateLike, opts = {}) {
  const withSeconds = !!opts.withSeconds;

  const d = toDateSafe(dateLike, null);
  if (!d) return "";

  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear());

  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");

  if (!withSeconds) return `${dd}/${mm}/${yy} ${hh}:${mi}`;

  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${dd}/${mm}/${yy} ${hh}:${mi}:${ss}`;
}

module.exports = formatBRDatetime;
