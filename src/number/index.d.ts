// src/number/index.d.ts

export function toNumberSafe(value: any, fallback?: number): number;

/** Garante que value fique entre min e max (ordem de min/max não importa). */
export function clamp(value: any, min: any, max: any): number;

/** Arredonda com estabilidade melhor (EPSILON). */
export function roundTo(value: any, decimals?: number): number;

/** Percentual (0..100), com fallback quando total=0 ou inválido. */
export function pct(part: any, total: any, decimals?: number, fallback?: number): number;

/** Soma números; aceita mapper opcional. */
export function sum(
  list: any[],
  mapper?: (item: any, idx: number) => any
): number;

/** Média; retorna 0 se lista vazia. Aceita mapper opcional. */
export function avg(
  list: any[],
  mapper?: (item: any, idx: number) => any
): number;

/**
 * range(start, end, step=1)
 * Inclusivo por padrão.
 * - range(1, 5) => [1,2,3,4,5]
 * - range(5, 1, -2) => [5,3,1]
 */
export function range(start: any, end: any, step?: any): number[];

declare const _default: {
  toNumberSafe: typeof toNumberSafe;
  clamp: typeof clamp;
  roundTo: typeof roundTo;
  pct: typeof pct;
  sum: typeof sum;
  avg: typeof avg;
  range: typeof range;
};

export default _default;
