"use strict";

const escapeRegex = require("./escapeRegex");

/**
 * safeRegex(q, opts)
 * Cria RegExp “safe-ish”:
 * - escapa tudo
 * - limita tamanho
 * - default flags: "i"
 *
 * @param {any} q
 * @param {object} [opts]
 * @param {string} [opts.flags="i"]
 * @param {number} [opts.maxLen=80]
 * @param {boolean} [opts.emptyMatchesNothing=true]
 * @returns {RegExp}
 */
function safeRegex(q, opts = {}) {
  const flags = typeof opts.flags === "string" ? opts.flags : "i";
  const maxLen = Number.isFinite(opts.maxLen) ? Math.max(1, Math.floor(opts.maxLen)) : 80;
  const emptyMatchesNothing = opts.emptyMatchesNothing !== false;

  const s0 = String(q ?? "").trim();
  const s = s0.length > maxLen ? s0.slice(0, maxLen) : s0;

  if (!s) return emptyMatchesNothing ? /$^/ : /.*/;

  try {
    return new RegExp(escapeRegex(s), flags);
  } catch {
    return /$^/;
  }
}

module.exports = safeRegex;
