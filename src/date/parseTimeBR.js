"use strict";

/**
 * parseTimeBR("HH:mm[:ss]") -> { hours, minutes, seconds } | null
 *
 * @param {any} value
 * @returns {{hours:number, minutes:number, seconds:number}|null}
 */
function parseTimeBR(value) {
  const s = String(value ?? "").trim();
  if (!s) return null;

  const m = s.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!m) return null;

  const hh = Number(m[1]);
  const mi = Number(m[2]);
  const ss = m[3] != null ? Number(m[3]) : 0;

  if (hh < 0 || hh > 23) return null;
  if (mi < 0 || mi > 59) return null;
  if (ss < 0 || ss > 59) return null;

  return { hours: hh, minutes: mi, seconds: ss };
}

module.exports = parseTimeBR;
