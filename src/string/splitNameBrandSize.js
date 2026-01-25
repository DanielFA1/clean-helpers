// src/string/splitNameBrandSize.js
"use strict";

const casefold = require("./casefold");

/**
 * splitNameBrandSize(text)
 * Heurística pragmática pra “nome de produto”:
 * - Extrai "size" (ex: 350ml, 2l, 1kg, 500 g, 12x200ml, 6 un, 24un, 30m, etc.)
 * - Extrai "brand" quando existe separador típico (marca vem após) ou (Marca)
 *
 * @param {any} text
 * @returns {{ name: string, brand: string, size: string, raw: string }}
 */
function splitNameBrandSize(text) {
  const raw = String(text ?? "").trim();
  if (!raw) return { name: "", brand: "", size: "", raw: "" };

  let s = raw.replace(/\s+/g, " ").trim();

  // ----------------------------
  // 1) Extrai size (melhor esforço)
  // ----------------------------
  // IMPORTANTE: regex precisa ser global pra matchAll/iterar sem loop infinito.
  const sizeRx = new RegExp(
    [
      // combos tipo 12x200ml / 6x1l / 2x500g
      String.raw`(\b\d+\s*x\s*\d+(?:[.,]\d+)?\s*(?:ml|l|g|kg)\b)`,
      // unidades: 6 un / 24un / 12 unidades
      String.raw`(\b\d+\s*(?:un|und|unid|unidade|unidades)\b)`,
      // volume/peso: 350ml / 2l / 1,5l / 500 g / 1 kg
      String.raw`(\b\d+(?:[.,]\d+)?\s*(?:ml|l|g|kg)\b)`,
      // comprimento simples: 30m / 10 m
      String.raw`(\b\d+(?:[.,]\d+)?\s*m\b)`,
    ].join("|"),
    "gi"
  );

  let size = "";

  // pega o ÚLTIMO match (geralmente é o mais relevante)
  const matches = Array.from(s.matchAll(sizeRx));
  if (matches.length) {
    const last = matches[matches.length - 1];
    const piece = String(last[0] || "").trim();

    if (piece) {
      size = piece;

      const start =
        typeof last.index === "number" ? last.index : s.lastIndexOf(piece);
      const end = start + piece.length;

      if (start >= 0) {
        s = (s.slice(0, start) + " " + s.slice(end))
          .replace(/\s+/g, " ")
          .trim();
      }
    }
  }

  // Normaliza size (ex: "350 ml" -> "350ML", "1,5l" -> "1.5L")
  size = size.replace(/\s+/g, "");
  size = size.replace(",", ".");
  size = size.toUpperCase();

  // ----------------------------
  // 2) Extrai brand via separadores comuns
  // ----------------------------
  let brand = "";

  // (Marca) no fim
  const parenBrand = s.match(/\(([^)]+)\)\s*$/);
  if (parenBrand && parenBrand[1]) {
    brand = String(parenBrand[1]).trim();
    s = s.replace(/\([^)]+\)\s*$/, "").trim();
  } else {
    // separadores no fim: "nome - marca" / "nome | marca" / "nome / marca"
    const sep = s.match(/^(.*?)(?:\s*[-|/]\s*)([^-|/]+)\s*$/);
    if (sep && sep[1] && sep[2]) {
      const left = sep[1].trim();
      const right = sep[2].trim();

      // se "marca" parece unidade, ignora
      if (right.length >= 2 && !/^(kg|g|ml|l|un|und)$/i.test(right)) {
        brand = right;
        s = left;
      }
    }
  }

  // ----------------------------
  // 3) Pós-processamento leve
  // ----------------------------
  let name = s.replace(/\s+/g, " ").trim();

  // Se brand ficou igual ao name em versão casefold, zera brand
  if (brand && casefold(brand) === casefold(name)) brand = "";

  return { name, brand, size, raw };
}

module.exports = splitNameBrandSize;
