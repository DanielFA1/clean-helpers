"use strict";

const parseMoneyStrict = require("./parseMoneyStrict");

/**
 * moneyToCents(value, opts)
 * Converte "R$ 1.234,56" -> 123456 (centavos)
 *
 * @param {any} value
 * @param {object} [opts]
 * @param {number} [opts.decimals=2]
 * @param {boolean} [opts.allowNegative=true]
 * @param {number|null} [opts.fallback=0]  // se null, retorna null quando inválido
 * @returns {number|null}
 */
function moneyToCents(value, opts = {}) {
  const fallback = Object.prototype.hasOwnProperty.call(opts, "fallback") ? opts.fallback : 0;

  const r = parseMoneyStrict(value, opts);
  if (!r.ok) return fallback === null ? null : Number(fallback) || 0;
  return r.cents;
}

module.exports = moneyToCents;
