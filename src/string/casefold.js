"use strict";

/**
 * casefold(text)
 * Normalização "forte" para comparação/busca:
 * - remove acentos
 * - lower
 * - remove pontuação
 * - colapsa espaços
 *
 * Ideal para "comparar nomes" (SKU, produto, pessoas) sem dor.
 *
 * @param {any} text
 * @returns {string}
 */
function casefold(text) {
  let s = String(text ?? "").trim();
  if (!s) return "";

  s = s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  // Remove pontuação e símbolos (mantém letras/números/espaço)
  s = s.replace(/[^a-z0-9 ]+/g, " ");
  s = s.replace(/\s+/g, " ").trim();

  return s;
}

module.exports = casefold;
