"use strict";

/**
 * wantsJson(req)
 * Decide se a resposta deveria ser JSON (vs HTML).
 * Heurísticas:
 * - XHR / fetch (x-requested-with)
 * - Accept inclui application/json
 * - path começa com /api
 *
 * @param {any} req (Express-like)
 * @returns {boolean}
 */
function wantsJson(req) {
  const r = req || {};
  const headers = r.headers || {};

  const path = String(r.path || r.originalUrl || "");
  if (path.startsWith("/api")) return true;

  const xhr = !!r.xhr || String(headers["x-requested-with"] || "").toLowerCase() === "xmlhttprequest";
  if (xhr) return true;

  const accept = String(headers.accept || "").toLowerCase();
  if (accept.includes("application/json")) return true;

  // se pede HTML explicitamente, tende a ser página
  if (accept.includes("text/html")) return false;

  return false;
}

module.exports = wantsJson;
