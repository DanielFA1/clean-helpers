"use strict";

/**
 * titleCasePTBR(text)
 * Título “humano” pt-BR com heurísticas práticas.
 *
 * @param {any} text
 * @param {object} [opts]
 * @param {Set<string>|string[]} [opts.lowerWords]
 * @returns {string}
 */
function titleCasePTBR(text, opts = {}) {
  let s = String(text ?? "").trim();
  if (!s) return "";

  const defaultLower = [
    "a", "as", "o", "os",
    "de", "da", "das", "do", "dos",
    "e", "em", "no", "na", "nos", "nas",
    "por", "pra", "pro", "para",
    "com", "sem",
    "ao", "aos", "à", "às",
    "um", "uma", "uns", "umas",
  ];

  const lowerWords = new Set(
    Array.isArray(opts.lowerWords)
      ? opts.lowerWords.map((w) => String(w).toLowerCase())
      : opts.lowerWords instanceof Set
        ? Array.from(opts.lowerWords).map((w) => String(w).toLowerCase())
        : defaultLower
  );

  const parts = s.split(/(\s+)/);

  function capWord(w, isFirst) {
    if (!w) return w;
    if (/^\s+$/.test(w)) return w;

    const raw = w;

    // ✅ SIGLAS: 2+ chars e NÃO tem minúsculas
    // Ex: "EAN", "SKU", "NF", "USB3"
    const hasLower = /[a-zà-ÿ]/.test(raw); // sem /i !!!
    if (!hasLower && /^[A-Z0-9]{2,}$/.test(raw)) return raw;

    // Tokens com número + letra -> uppercase (2L, 350ML)
    if (/\d/.test(raw) && /[a-zA-Z]/.test(raw)) return raw.toUpperCase();

    // Trata hífen e apóstrofo internamente
    const sub = raw.split(/([-'’])/g);

    return sub
      .map((chunk) => {
        if (chunk === "-" || chunk === "'") return chunk;

        const lw = chunk.toLowerCase();
        if (!isFirst && lowerWords.has(lw)) return lw;

        return lw.charAt(0).toUpperCase() + lw.slice(1);
      })
      .join("");
  }

  let wordIndex = 0;

  return parts
    .map((p) => {
      if (/^\s+$/.test(p)) return p;
      const isFirst = wordIndex === 0;
      wordIndex += 1;
      return capWord(p, isFirst);
    })
    .join("");
}

module.exports = titleCasePTBR;
