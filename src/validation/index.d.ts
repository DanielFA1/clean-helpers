// src/validation/index.d.ts

export function isEmpty(value: any): boolean;

/** Validação pragmática de e-mail (regex simples). */
export function isEmail(email: any): boolean;

/** Valida CPF com dígitos verificadores. */
export function isCPF(value: any): boolean;

/** Valida CNPJ com dígitos verificadores. */
export function isCNPJ(value: any): boolean;

/** Valida EAN-13 (código de barras). */
export function isEAN13(value: any): boolean;

/**
 * Telefone BR pragmático:
 * - 10 ou 11 dígitos (sem DDI)
 * - 12 ou 13 dígitos com DDI 55
 */
export function isPhoneBR(value: any): boolean;

/** CEP: 8 dígitos. */
export function isCEP(value: any): boolean;

/** NCM: 8 dígitos (pragmático; rejeita sequência tipo 00000000). */
export function isNCM(value: any): boolean;

/** CEST: 7 dígitos (pragmático; rejeita sequência tipo 0000000). */
export function isCEST(value: any): boolean;

export type ValidationError = Error & {
  name: "ValidationError";
  code?: string;
  details?: Record<string, any>;
};

/**
 * Se condition for falsy, lança ValidationError (name="ValidationError", code="VALIDATION_ERROR" por default).
 * Se for truthy, retorna sem erro.
 */
export function assert(
  condition: any,
  message?: string,
  details?: Record<string, any>,
  code?: string
): asserts condition;

export type PickValidType = "cpf" | "cnpj" | "email" | "phone" | "cep" | "ean13";

export interface PickValidOptions {
  /** ordem de prioridade (strings desconhecidas são ignoradas) */
  order?: Array<PickValidType | string>;
}

export type PickValidResult =
  | { type: PickValidType; key: PickValidType; value: string }
  | null;

/**
 * Retorna o primeiro campo válido, com tipo e valor normalizado.
 * (Só valida chaves exatamente: cpf, cnpj, email, phone, cep, ean13)
 */
export function pickValid(fields: Record<string, any>, opts?: PickValidOptions): PickValidResult;

declare const _default: {
  isEmpty: typeof isEmpty;
  isEmail: typeof isEmail;
  isCPF: typeof isCPF;
  isCNPJ: typeof isCNPJ;
  isEAN13: typeof isEAN13;
  isPhoneBR: typeof isPhoneBR;
  isCEP: typeof isCEP;
  assert: typeof assert;
  pickValid: typeof pickValid;
  isNCM: typeof isNCM;
  isCEST: typeof isCEST;
};

export default _default;
