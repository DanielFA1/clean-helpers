"use strict";

const casefold = require("./casefold");

/**
 * includesLoose(haystack, needle)
 * Busca “solta”:
 * - ignora acentos/case/pontuação
 * - para múltiplas palavras, verifica se TODOS os tokens do needle existem no haystack)
 *
 * @param {any} haystack
 * @param {any} needle
 * @param {object} [opts]
 * @param {boolean} [opts.requireAll=true] - exige todos tokens do needle
 * @returns {boolean}
 */
function includesLoose(haystack, needle, opts = {}) {
  const requireAll = opts.requireAll !== false;

  const h = casefold(haystack);
  const n = casefold(needle);

  if (!n) return true;
  if (!h) return false;

  const hTokens = h.split(" ").filter(Boolean);
  const nTokens = n.split(" ").filter(Boolean);

  if (nTokens.length === 0) return true;

  // 1 token -> substring simples já é suficiente
  if (nTokens.length === 1) return h.includes(nTokens[0]);

  const hSet = new Set(hTokens);

  if (requireAll) {
    return nTokens.every((t) => hSet.has(t));
  }
  return nTokens.some((t) => hSet.has(t));
}

module.exports = includesLoose;
