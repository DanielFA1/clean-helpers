"use strict";

const parseISODateOrBR = require("../date/parseISODateOrBR");
const startOfDay = require("../date/startOfDay");
const endOfDay = require("../date/endOfDay");

/**
 * parseBlackouts(input)
 * Interpreta “blackouts” de data (dias bloqueados), retornando ranges em ms.
 *
 * Aceita:
 * - "2026-01-21"
 * - "21/01/2026"
 * - "2026-01-21..2026-01-25"
 * - "21/01/2026..25/01/2026"
 * - múltiplos separados por vírgula/;| espaço
 * - array de strings
 *
 * Retorna: [{ startMs, endMs }]
 *
 * @param {any} input
 * @returns {{startMs:number, endMs:number}[]}
 */
function parseBlackouts(input) {
  const items = Array.isArray(input)
    ? input
    : String(input ?? "")
        .trim()
        .split(/[,\s;|]+/g)
        .filter(Boolean);

  const out = [];

  for (const raw of items) {
    const s = String(raw ?? "").trim();
    if (!s) continue;

    const parts = s.split("..");
    if (parts.length === 2) {
      const a = parseISODateOrBR(parts[0]);
      const b = parseISODateOrBR(parts[1]);
      if (!a || !b) continue;

      const sDay = startOfDay(a);
      const eDay = endOfDay(b);
      if (!sDay || !eDay) continue;

      const startMs = Math.min(sDay.getTime(), startOfDay(b).getTime());
      const endMs = Math.max(eDay.getTime(), endOfDay(a).getTime());

      out.push({ startMs, endMs });
      continue;
    }

    const d = parseISODateOrBR(s);
    if (!d) continue;

    const st = startOfDay(d);
    const en = endOfDay(d);
    if (!st || !en) continue;

    out.push({ startMs: st.getTime(), endMs: en.getTime() });
  }

  // merge simples (opcional) — mantém ordenado e sem overlaps
  out.sort((x, y) => x.startMs - y.startMs);

  const merged = [];
  for (const r of out) {
    const last = merged[merged.length - 1];
    if (!last || r.startMs > last.endMs + 1) merged.push({ ...r });
    else last.endMs = Math.max(last.endMs, r.endMs);
  }

  return merged;
}

module.exports = parseBlackouts;
