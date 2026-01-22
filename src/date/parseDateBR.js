"use strict";

/**
 * parseDateBR("dd/mm/yyyy") -> Date ou null
 *
 * @param {any} value
 * @returns {Date|null}
 */
function parseDateBR(value) {
  const s = String(value ?? "").trim();
  if (!s) return null;

  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
  if (!m) return null;

  const dd = Number(m[1]);
  const mm = Number(m[2]);
  let yy = Number(m[3]);
  if (yy < 100) yy += 2000;

  const d = new Date(yy, mm - 1, dd);
  if (
    d instanceof Date &&
    Number.isFinite(d.getTime()) &&
    d.getFullYear() === yy &&
    d.getMonth() === mm - 1 &&
    d.getDate() === dd
  ) {
    return d;
  }
  return null;
}

module.exports = parseDateBR;
