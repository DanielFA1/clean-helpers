"use strict";

const casefold = require("./casefold");

function splitNameBrandSize(text) {
  const raw = String(text ?? "").trim();
  if (!raw) return { name: "", brand: "", size: "", raw: "" };

  let s = raw.replace(/\s+/g, " ").trim();

  const sizeRx = new RegExp(
    [
      String.raw`(\b\d+\s*x\s*\d+(?:[.,]\d+)?\s*(?:ml|l|g|kg)\b)`,
      String.raw`(\b\d+\s*(?:un|und|unid|unidade|unidades)\b)`,
      String.raw`(\b\d+(?:[.,]\d+)?\s*(?:ml|l|g|kg)\b)`,
      String.raw`(\b\d+(?:[.,]\d+)?\s*m\b)`,
    ].join("|"),
    "ig" // <-- aqui: global + case-insensitive
  );

  let size = "";
  let last = null;

  // matchAll exige regex com flag "g"
  for (const m of s.matchAll(sizeRx)) last = m;

  if (last) {
    size = (last[0] || "").trim();

    const start = last.index ?? -1;
    if (start >= 0) {
      const end = start + size.length;
      s = (s.slice(0, start) + " " + s.slice(end)).replace(/\s+/g, " ").trim();
    }
  }

  // Normaliza size
  size = size.replace(/\s+/g, "");
  size = size.replace(",", ".");
  size = size.toUpperCase();

  // ---- brand ----
  let brand = "";

  const parenBrand = s.match(/\(([^)]+)\)\s*$/);
  if (parenBrand && parenBrand[1]) {
    brand = String(parenBrand[1]).trim();
    s = s.replace(/\([^)]+\)\s*$/, "").trim();
  } else {
    const sep = s.match(/^(.*?)(?:\s*[-|/]\s*)([^-|/]+)\s*$/);
    if (sep && sep[1] && sep[2]) {
      const left = sep[1].trim();
      const right = sep[2].trim();

      if (right.length >= 2 && !/^(kg|g|ml|l|un|und)$/i.test(right)) {
        brand = right;
        s = left;
      }
    }
  }

  let name = s.replace(/\s+/g, " ").trim();
  if (brand && casefold(brand) === casefold(name)) brand = "";

  return { name, brand, size, raw };
}

module.exports = splitNameBrandSize;
