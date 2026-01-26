// src/search/index.d.ts

/**
 * Normaliza texto para busca:
 * - minúsculas
 * - remove acentos
 * - pontuação vira espaço
 * - colapsa espaços
 */
export function normalizeSearchText(text: any): string;

export interface MakeSearchTokensOptions {
  /** default: false */
  keepStopwords?: boolean;
  /** default: 2 */
  minLen?: number;
}

/**
 * Tokeniza texto de forma útil pra busca:
 * - remove stopwords BR comuns (a não ser que keepStopwords=true)
 * - une número + unidade ("2" + "l" => "2l")
 * - remove duplicados preservando ordem
 */
export function makeSearchTokens(text: any, opts?: MakeSearchTokensOptions): string[];

declare const _default: {
  normalizeSearchText: typeof normalizeSearchText;
  makeSearchTokens: typeof makeSearchTokens;
};

export default _default;
