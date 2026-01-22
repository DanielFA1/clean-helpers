"use strict";

/**
 * escapeRegex(text)
 * Escapa caracteres especiais de regex.
 *
 * @param {string} s
 * @returns {string}
 */
function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * safeRegex(input, flags="i")
 * Cria RegExp a partir de texto do usuário com escape, evitando ReDoS e regex injection.
 * Útil para filtros no Mongo, buscas simples, etc.
 *
 * @param {any} input
 * @param {string} [flags="i"]
 * @param {object} [opts]
 * @param {number} [opts.maxLen=80]
 * @returns {RegExp}
 */
function safeRegex(input, flags = "i", opts = {}) {
  const maxLen = Number.isFinite(opts.maxLen) ? opts.maxLen : 80;

  let s = String(input ?? "").trim();
  if (!s) return new RegExp("", flags);

  if (s.length > maxLen) s = s.slice(0, maxLen);

  return new RegExp(escapeRegex(s), flags);
}

module.exports = safeRegex;
