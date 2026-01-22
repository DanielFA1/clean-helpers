"use strict";

const casefold = require("./casefold");

/**
 * splitNameBrandSize(text)
 * Heurística pragmática pra “nome de produto”:
 * - Tenta extrair "size" (ex: 350ml, 2l, 1kg, 500 g, 12x200ml, 6 un, 24un, 30m, etc.)
 * - Tenta extrair "brand" quando existe um separador típico (marca vem após)
 *
 * É heurístico: retorna melhor esforço, não “verdade absoluta”.
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
  // Padrões comuns no varejo BR:
  // - 350ml, 2l, 1kg, 500g, 750 ml
  // - 12x200ml, 6x1l, 2x500g
  // - 6 un, 24un, 12 unidades
  // - 30m, 10 m, 1,5l
  //
  // Preferimos size no fim, mas também pegamos se estiver no meio.
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
    "i"
  );

  let size = "";
  // tenta achar o último match (geralmente é o mais relevante)
  let match;
  let last = null;
  while ((match = sizeRx.exec(s)) !== null) {
    last = match;
    // evita loop infinito em regex sem avanço
    if (match.index === sizeRx.lastIndex) sizeRx.lastIndex++;
  }
  if (last) {
    size = (last[0] || "").trim();
    // remove size do texto original (só a ocorrência do último match)
    const start = last.index;
    const end = start + size.length;
    s = (s.slice(0, start) + " " + s.slice(end)).replace(/\s+/g, " ").trim();
  }

  // Normaliza size (ex: "350 ml" -> "350ml")
  size = size.replace(/\s+/g, "");
  size = size.replace(",", "."); // "1,5l" -> "1.5l"
  size = size.toUpperCase();

  // ----------------------------
  // 2) Extrai brand via separadores comuns
  // ----------------------------
  // Exemplos:
  // - "Refrigerante Guaraná Antarctica 2L" (sem separador) => brand pode ser difícil
  // - "Café - Pilão 500g" => brand = Pilão
  // - "Arroz | Tio João 1kg" => brand = Tio João
  // - "Sabão em pó (Omo) 1kg" => brand = Omo (parênteses)
  let brand = "";

  // (Marca)
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

      // Heurística: se a "marca" parece curta demais tipo "Kg" ou "ML", ignora
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
