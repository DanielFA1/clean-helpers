// src/money/index.d.ts

export type MoneyStrictFailReason =
  | "not_finite"
  | "negative_not_allowed"
  | "too_many_decimals"
  | "too_large"
  | "empty"
  | "no_digits"
  | "ambiguous_thousands"
  | "invalid_format"
  | (string & {});

export interface ParseMoneyStrictOptions {
  decimals?: number; // default: 2
  allowNegative?: boolean; // default: true
}

export type ParseMoneyStrictOk = {
  ok: true;
  value: number;
  cents: number;
};

export type ParseMoneyStrictFail = {
  ok: false;
  value: 0;
  cents: 0;
  reason: MoneyStrictFailReason;
};

export type ParseMoneyStrictResult = ParseMoneyStrictOk | ParseMoneyStrictFail;

/**
 * Parser estrito pra dinheiro:
 * - aceita "1.234,56", "1234.56", "R$ 1.234,56", "(1.234,56)", "-1.234,56"
 * - valida no máximo N casas decimais (padrão 2)
 * - retorna { ok, value, cents, reason }
 */
export function parseMoneyStrict(
  value: any,
  opts?: ParseMoneyStrictOptions
): ParseMoneyStrictResult;

export interface ParseMoneyOptions {
  /** Se true, retorna NaN ao invés de 0 quando inválido */
  strict?: boolean; // default: false
  allowNegative?: boolean; // default: true
}

/**
 * Parser flexível (pragmático) pra dinheiro.
 * Retorna 0 quando inválido (ou NaN se opts.strict=true).
 */
export function parseMoney(value: any, opts?: ParseMoneyOptions): number;

export interface MoneyToCentsOptions extends ParseMoneyStrictOptions {
  /**
   * fallback (default 0).
   * Se null, retorna null quando inválido.
   */
  fallback?: number | null;
}

/** Converte "R$ 1.234,56" -> 123456 (centavos) */
export function moneyToCents(value: any, opts?: MoneyToCentsOptions): number | null;

export interface CentsToMoneyOptions {
  decimals?: number; // default: 2
}

/** 123456 -> 1234.56 */
export function centsToMoney(cents: any, opts?: CentsToMoneyOptions): number;

export interface FormatBRLPlainOptions {
  locale?: string; // default: "pt-BR"
  minFraction?: number; // default: 2
  maxFraction?: number; // default: 2
}

/** 1234.56 -> "1.234,56" (sem "R$") */
export function formatBRLPlain(value: any, opts?: FormatBRLPlainOptions): string;

export interface FormatBRLOptions {
  /** Se false, formata como decimal pt-BR (sem "R$") */
  symbol?: boolean; // default: true
  min?: number; // default: 2
  max?: number; // default: 2
  locale?: string; // default: "pt-BR"
}

/** 1234.56 -> "R$ 1.234,56" */
export function formatBRL(value: number | string, opts?: FormatBRLOptions): string;

declare const _default: {
  parseMoneyStrict: typeof parseMoneyStrict;
  moneyToCents: typeof moneyToCents;
  centsToMoney: typeof centsToMoney;
  formatBRLPlain: typeof formatBRLPlain;
  parseMoney: typeof parseMoney;
  formatBRL: typeof formatBRL;
};

export default _default;
