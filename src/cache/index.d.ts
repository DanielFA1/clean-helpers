// src/cache/index.d.ts

export type FreshTimestampLike = number | Date | string;

export type FreshEntry =
  | number
  | {
      ts?: FreshTimestampLike;
      at?: FreshTimestampLike;
      updatedAt?: FreshTimestampLike;
      createdAt?: FreshTimestampLike;
      time?: FreshTimestampLike;
      [key: string]: any;
    }
  | null
  | undefined;

/**
 * Retorna true se `entry` estiver dentro do TTL.
 *
 * Aceita:
 * - `entry` como número (timestamp em ms)
 * - `entry` como objeto com { ts } / { at } / { updatedAt } / { createdAt } / { time }
 */
export function isFresh(entry: FreshEntry, ttlMs: number, nowMs?: number): boolean;

declare const _default: {
  isFresh: typeof isFresh;
};

export default _default;

