"use strict";

/**
 * formatBRL(value)
 *
 * @param {number|string} value
 * @param {object} [opts]
 * @param {boolean} [opts.symbol=true] - Se false, formata como número pt-BR (sem "R$")
 * @param {number} [opts.min=2] - minimumFractionDigits
 * @param {number} [opts.max=2] - maximumFractionDigits
 * @param {string} [opts.locale="pt-BR"]
 * @returns {string}
 */
const _cache = new Map();

function formatBRL(value, opts = {}) {
  const locale = opts.locale || "pt-BR";
  const symbol = opts.symbol !== false;
  const min = Number.isFinite(opts.min) ? opts.min : 2;
  const max = Number.isFinite(opts.max) ? opts.max : 2;

  const n = typeof value === "number" ? value : Number(value);
  const safe = Number.isFinite(n) ? n : 0;

  const cacheKey = `${locale}|${symbol ? "currency" : "decimal"}|${min}|${max}`;
  let fmt = _cache.get(cacheKey);

  if (!fmt) {
    const options = symbol
      ? { style: "currency", currency: "BRL", minimumFractionDigits: min, maximumFractionDigits: max }
      : { style: "decimal", minimumFractionDigits: min, maximumFractionDigits: max };

    fmt = new Intl.NumberFormat(locale, options);
    _cache.set(cacheKey, fmt);
  }

  try {
    return fmt.format(safe);
  } catch {
    // Fallback simples (raro)
    const fixed = safe.toFixed(max);
    // troca '.' por ',' e insere milhar
    const [a, b] = fixed.split(".");
    const withThousands = a.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return symbol ? `R$ ${withThousands},${b || "00"}` : `${withThousands},${b || "00"}`;
  }
}

module.exports = formatBRL;
