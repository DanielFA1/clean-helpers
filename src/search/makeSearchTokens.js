"use strict";

const normalizeSearchText = require("./normalizeSearchText");

/**
 * makeSearchTokens(text, opts)
 * Tokeniza de forma útil pra busca em produto:
 * - remove stopwords BR comuns
 * - une número + unidade ("2" + "l" => "2l")
 * - mantém tokens numéricos e alfanuméricos relevantes
 *
 * @param {any} text
 * @param {object} [opts]
 * @param {boolean} [opts.keepStopwords=false]
 * @param {number} [opts.minLen=2]
 * @returns {string[]}
 */
function makeSearchTokens(text, opts = {}) {
  const keepStopwords = !!opts.keepStopwords;
  const minLen = Number.isFinite(opts.minLen) ? Math.max(1, Math.floor(opts.minLen)) : 2;

  const stop = new Set([
    "de", "da", "do", "das", "dos",
    "e", "em", "na", "no", "nas", "nos",
    "para", "pra", "pro", "por", "com", "sem",
    "um", "uma", "uns", "umas",
    "a", "o", "as", "os",
  ]);

  const units = new Set(["ml", "l", "kg", "g", "mg", "un", "und", "pct", "%"]);

  const norm = normalizeSearchText(text);
  if (!norm) return [];

  const raw = norm.split(" ").filter(Boolean);

  const out = [];
  for (let i = 0; i < raw.length; i++) {
    const t = raw[i];

    // une "2" + "l" => "2l"
    if (/^\d+([.,]\d+)?$/.test(t) && i + 1 < raw.length && units.has(raw[i + 1])) {
      out.push(`${t.replace(",", ".")}${raw[i + 1]}`.replace(".", ",")); // mantém vírgula? (não importa muito)
      i++;
      continue;
    }

    out.push(t);
  }

  // filtra
  const filtered = out.filter((t) => {
    if (!keepStopwords && stop.has(t)) return false;
    if (t.length >= minLen) return true;
    // aceita números mesmo pequenos
    if (/^\d+$/.test(t)) return true;
    return false;
  });

  // únicos preservando ordem
  const seen = new Set();
  const uniq = [];
  for (const t of filtered) {
    if (seen.has(t)) continue;
    seen.add(t);
    uniq.push(t);
  }

  return uniq;
}

module.exports = makeSearchTokens;
