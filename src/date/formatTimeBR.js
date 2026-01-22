"use strict";

const toDateSafe = require("./toDateSafe");

/**
 * formatTimeBR(dateLike, opts)
 * Formata só o horário "HH:mm" (ou "HH:mm:ss")
 *
 * @param {any} dateLike
 * @param {object} [opts]
 * @param {boolean} [opts.withSeconds=false]
 * @returns {string}
 */
function formatTimeBR(dateLike, opts = {}) {
  const withSeconds = !!opts.withSeconds;
  const d = toDateSafe(dateLike, null);
  if (!d) return "";

  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  if (!withSeconds) return `${hh}:${mi}`;

  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mi}:${ss}`;
}

module.exports = formatTimeBR;
