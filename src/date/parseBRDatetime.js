"use strict";

/**
 * parseBRDatetime("dd/mm/yyyy HH:mm[:ss]") -> Date | null
 * - Aceita também "dd/mm/yy HH:mm"
 * - Se não vier hora, pode usar parseDateBR (esse helper é pra datetime)
 *
 * @param {any} value
 * @returns {Date|null}
 */
function parseBRDatetime(value) {
  const s = String(value ?? "").trim();
  if (!s) return null;

  // dd/mm/yyyy HH:mm ou dd/mm/yyyy HH:mm:ss
  const m = s.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?$/
  );
  if (!m) return null;

  const dd = Number(m[1]);
  const mm = Number(m[2]);
  let yy = Number(m[3]);
  if (yy < 100) yy += 2000;

  const hh = Number(m[4]);
  const mi = Number(m[5]);
  const ss = m[6] != null ? Number(m[6]) : 0;

  // validações básicas
  if (
    !Number.isFinite(dd) || !Number.isFinite(mm) || !Number.isFinite(yy) ||
    !Number.isFinite(hh) || !Number.isFinite(mi) || !Number.isFinite(ss)
  ) return null;

  if (mm < 1 || mm > 12) return null;
  if (dd < 1 || dd > 31) return null;
  if (hh < 0 || hh > 23) return null;
  if (mi < 0 || mi > 59) return null;
  if (ss < 0 || ss > 59) return null;

  const d = new Date(yy, mm - 1, dd, hh, mi, ss, 0);

  // valida dia/mês real (evita 31/02 etc)
  if (
    d.getFullYear() !== yy ||
    d.getMonth() !== mm - 1 ||
    d.getDate() !== dd ||
    d.getHours() !== hh ||
    d.getMinutes() !== mi ||
    d.getSeconds() !== ss
  ) return null;

  return d;
}

module.exports = parseBRDatetime;
