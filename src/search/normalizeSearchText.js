"use strict";

const casefold = require("../string/casefold");

/**
 * normalizeSearchText(text)
 * Normaliza texto pra busca:
 * - minúsculas
 * - remove acentos
 * - pontuação vira espaço
 * - colapsa espaços
 *
 * @param {any} text
 * @returns {string}
 */
function normalizeSearchText(text) {
  let s = casefold(text);

  if (!s) return "";

  // troca qualquer coisa não alfanumérica por espaço
  s = s.replace(/[^a-z0-9]+/g, " ");

  // colapsa espaços
  s = s.replace(/\s+/g, " ").trim();

  return s;
}

module.exports = normalizeSearchText;
