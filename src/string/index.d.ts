// src/string/index.d.ts

export interface NormalizePTBROptions {
  case?: "upper" | "lower" | "none"; // default: "upper"
  keepPunctuation?: boolean; // default: false
}

/**
 * Normaliza string pra busca/comparação:
 * - trim
 * - remove acentos (NFD)
 * - colapsa espaços
 * - opcional: upper/lower/none
 * - opcional: remover pontuação comum
 */
export function normalizePTBR(text: any, opts?: NormalizePTBROptions): string;

/** Remove tudo que não é dígito. */
export function cleanDigits(value: any): string;

/**
 * Normalização "forte" para comparação/busca:
 * - remove acentos
 * - lower
 * - remove pontuação (mantém letras/números/espaço)
 * - colapsa espaços
 */
export function casefold(text: any): string;

export interface IncludesLooseOptions {
  /** default: true (exige todos tokens do needle) */
  requireAll?: boolean;
}

/**
 * Busca “solta”:
 * - ignora acentos/case/pontuação
 * - se needle tem várias palavras: checa tokens (all ou any)
 */
export function includesLoose(
  haystack: any,
  needle: any,
  opts?: IncludesLooseOptions
): boolean;

export interface SlugifyOptions {
  separator?: string; // default: "-"
  keepDots?: boolean; // default: false
}

/**
 * Gera slug estável:
 * - remove acentos
 * - lower
 * - troca espaços por separator
 * - remove caracteres não permitidos
 */
export function slugify(text: any, opts?: SlugifyOptions): string;

export interface TitleCasePTBROptions {
  lowerWords?: Set<string> | string[];
}

/**
 * Título “humano” pt-BR com heurísticas práticas.
 */
export function titleCasePTBR(text: any, opts?: TitleCasePTBROptions): string;

export interface SplitNameBrandSizeResult {
  name: string;
  brand: string;
  size: string;
  raw: string;
}

/**
 * Heurística pragmática pra “nome de produto”:
 * - Extrai size (350ml, 2l, 1kg, 12x200ml, 6un, 30m, etc.)
 * - Extrai brand quando existe separador típico ou (Marca)
 */
export function splitNameBrandSize(text: any): SplitNameBrandSizeResult;

declare const _default: {
  cleanDigits: typeof cleanDigits;
  normalizePTBR: typeof normalizePTBR;
  slugify: typeof slugify;
  casefold: typeof casefold;
  includesLoose: typeof includesLoose;
  titleCasePTBR: typeof titleCasePTBR;
  splitNameBrandSize: typeof splitNameBrandSize;
};

export default _default;
