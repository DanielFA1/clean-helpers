"use strict";

const toDateSafe = require("./toDateSafe");
const parseDateBR = require("./parseDateBR");
const parseBRDatetime = require("./parseBRDatetime");

/**
 * parseISODateOrBR(value)
 * Aceita:
 * - Date
 * - number (ms ou s)
 * - "2026-01-21" (ISO date) -> interpretado como LOCAL (não UTC) ✅
 * - "2026-01-21T10:00:00Z" / ISO datetime
 * - "21/01/2026"
 * - "21/01/2026 10:00" / "21/01/2026 10:00:00"
 *
 * Retorna Date ou null.
 *
 * @param {any} value
 * @returns {Date|null}
 */
function parseISODateOrBR(value) {
  if (value instanceof Date || typeof value === "number") {
    return toDateSafe(value, null);
  }

  const s = String(value ?? "").trim();
  if (!s) return null;

  // 0) ISO date-only: YYYY-MM-DD
  // JS trata isso como UTC; aqui a gente quer LOCAL.
  const isoDateOnly = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoDateOnly) {
    const y = Number(isoDateOnly[1]);
    const m = Number(isoDateOnly[2]);
    const d = Number(isoDateOnly[3]);

    const dt = new Date(y, m - 1, d);
    // valida real (evita 2026-02-31)
    if (
      dt instanceof Date &&
      Number.isFinite(dt.getTime()) &&
      dt.getFullYear() === y &&
      dt.getMonth() === m - 1 &&
      dt.getDate() === d
    ) {
      return dt;
    }
    return null;
  }

  // 1) BR datetime
  const brdt = parseBRDatetime(s);
  if (brdt) return brdt;

  // 2) BR date
  const brd = parseDateBR(s);
  if (brd) return brd;

  // 3) ISO datetime / Date.parse
  const iso = toDateSafe(s, null);
  if (iso) return iso;

  return null;
}

module.exports = parseISODateOrBR;
