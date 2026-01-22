"use strict";

const normalizePTBR = require("./normalizePTBR");

/**
 * slugify(text)
 * Gera slug estável:
 * - remove acentos
 * - lower
 * - troca espaços por "-"
 * - remove caracteres não permitidos
 *
 * @param {any} text
 * @param {object} [opts]
 * @param {string} [opts.separator="-"]
 * @param {boolean} [opts.keepDots=false] - se true, mantém "." (útil em versões)
 * @returns {string}
 */
function slugify(text, opts = {}) {
  const sep = typeof opts.separator === "string" ? opts.separator : "-";
  const keepDots = !!opts.keepDots;

  let s = normalizePTBR(text, { case: "lower", keepPunctuation: true });

  // Troca qualquer coisa que não seja letra/número/espaço por espaço (ou mantém "." se pedido)
  if (keepDots) s = s.replace(/[^a-z0-9 ._-]+/g, " ");
  else s = s.replace(/[^a-z0-9 _-]+/g, " ");

  s = s.trim().replace(/\s+/g, sep);

  // Remove duplicação do separador
  const esc = sep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  s = s.replace(new RegExp(`${esc}{2,}`, "g"), sep);

  // Remove separador nas pontas
  s = s.replace(new RegExp(`^${esc}+|${esc}+$`, "g"), "");

  return s;
}

module.exports = slugify;
