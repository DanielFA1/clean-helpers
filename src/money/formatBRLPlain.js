"use strict";

const toNumberSafe = require("../number/toNumberSafe");

/**
 * formatBRLPlain(value, opts)
 * Formata número para pt-BR DECIMAL, sem "R$".
 * Ex: 1234.56 -> "1.234,56"
 *
 * @param {any} value
 * @param {object} [opts]
 * @param {string} [opts.locale="pt-BR"]
 * @param {number} [opts.minFraction=2]
 * @param {number} [opts.maxFraction=2]
 * @returns {string}
 */
function formatBRLPlain(value, opts = {}) {
  const locale = opts.locale || "pt-BR";
  const minFraction = Number.isFinite(opts.minFraction) ? opts.minFraction : 2;
  const maxFraction = Number.isFinite(opts.maxFraction) ? opts.maxFraction : 2;

  const n = toNumberSafe(value, 0);

  try {
    return new Intl.NumberFormat(locale, {
      style: "decimal",
      minimumFractionDigits: minFraction,
      maximumFractionDigits: maxFraction,
    }).format(n);
  } catch {
    // fallback simples
    return String(n.toFixed(maxFraction)).replace(".", ",");
  }
}

module.exports = formatBRLPlain;
