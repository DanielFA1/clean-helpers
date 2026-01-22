"use strict";

/**
 * escapeRegex(text)
 * Escapa caracteres especiais para uso em new RegExp().
 *
 * @param {any} text
 * @returns {string}
 */
function escapeRegex(text) {
  return String(text ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = escapeRegex;
