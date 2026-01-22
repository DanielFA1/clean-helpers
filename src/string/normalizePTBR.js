"use strict";

/**
 * normalizePTBR(text)
 * Normaliza string pra busca/comparação:
 * - trim
 * - remove acentos (NFD)
 * - colapsa espaços
 * - opcional: upper/lower
 *
 * @param {any} text
 * @param {object} [opts]
 * @param {"upper"|"lower"|"none"} [opts.case="upper"]
 * @param {boolean} [opts.keepPunctuation=false] - se false, remove pontuação comum
 * @returns {string}
 */
function normalizePTBR(text, opts = {}) {
  const mode = opts.case || "upper";
  const keepPunctuation = !!opts.keepPunctuation;

  let s = String(text ?? "").trim();
  if (!s) return "";

  s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Normaliza espaços
  s = s.replace(/\s+/g, " ");

  if (!keepPunctuation) {
    // Remove pontuação "normal" de textos (mantém letras/números/espaço)
    // Ex: "Coca-Cola 2L" -> "Coca Cola 2L"
    s = s.replace(/[^a-zA-Z0-9 ]+/g, " ");
    s = s.replace(/\s+/g, " ").trim();
  }

  if (mode === "upper") return s.toUpperCase();
  if (mode === "lower") return s.toLowerCase();
  return s;
}

module.exports = normalizePTBR;
