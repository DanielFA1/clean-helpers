"use strict";

const isValidDate = require("./isValidDate");

/**
 * toDateSafe(value, fallback=null)
 * Converte para Date com regras pragmáticas:
 * - Date -> retorna clone
 * - number -> trata como ms (13 dígitos) ou s (10 dígitos)
 * - string -> tenta ISO/Date.parse, depois tenta dd/mm/yyyy
 *
 * @param {any} value
 * @param {Date|null} [fallback=null]
 * @returns {Date|null}
 */
function toDateSafe(value, fallback = null) {
  if (value instanceof Date) {
    const d = new Date(value.getTime());
    return isValidDate(d) ? d : fallback;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    const ms = value < 1e12 ? value * 1000 : value; // 10 dígitos => seconds
    const d = new Date(ms);
    return isValidDate(d) ? d : fallback;
  }

  const s = String(value ?? "").trim();
  if (!s) return fallback;

  // Tenta parse direto (ISO, RFC, etc)
  const d1 = new Date(s);
  if (isValidDate(d1)) return d1;

  // Tenta dd/mm/yyyy (ou dd/mm/yy)
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
  if (m) {
    const dd = Number(m[1]);
    const mm = Number(m[2]);
    let yy = Number(m[3]);
    if (yy < 100) yy += 2000;

    const d2 = new Date(yy, mm - 1, dd);
    // valida dia/mês (evita 32/13 etc)
    if (
      isValidDate(d2) &&
      d2.getFullYear() === yy &&
      d2.getMonth() === mm - 1 &&
      d2.getDate() === dd
    ) {
      return d2;
    }
  }

  return fallback;
}

module.exports = toDateSafe;
