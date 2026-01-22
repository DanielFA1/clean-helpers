"use strict";

/**
 * toNumberSafe(value, fallback=0)
 * Converte para number, com fallback quando inválido.
 *
 * @param {any} value
 * @param {number} [fallback=0]
 * @returns {number}
 */
function toNumberSafe(value, fallback = 0) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

module.exports = toNumberSafe;
