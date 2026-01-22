"use strict";

/**
 * isFresh(entry, ttlMs, nowMs?)
 * Retorna true se entry estiver dentro do TTL.
 *
 * Aceita:
 * - entry como número (timestamp ms)
 * - entry como objeto com { ts } / { at } / { updatedAt } / { createdAt }
 *
 * @param {any} entry
 * @param {number} ttlMs
 * @param {number} [nowMs=Date.now()]
 * @returns {boolean}
 */
function isFresh(entry, ttlMs, nowMs = Date.now()) {
  const ttl = Number(ttlMs);
  if (!Number.isFinite(ttl) || ttl <= 0) return false;

  let ts = null;

  if (typeof entry === "number") ts = entry;
  else if (entry && typeof entry === "object") {
    const cand =
      entry.ts ??
      entry.at ??
      entry.updatedAt ??
      entry.createdAt ??
      entry.time ??
      null;

    if (typeof cand === "number") ts = cand;
    else if (cand instanceof Date) ts = cand.getTime();
    else if (typeof cand === "string" && cand.trim()) {
      const d = new Date(cand);
      if (Number.isFinite(d.getTime())) ts = d.getTime();
    }
  }

  if (!Number.isFinite(ts)) return false;

  const now = Number(nowMs);
  if (!Number.isFinite(now)) return false;

  return now - ts <= ttl;
}

module.exports = isFresh;
