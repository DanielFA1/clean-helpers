// src/async/index.d.ts

export type PromiseOrValue<T> = T | PromiseLike<T>;

/** Erro usado quando um timeout estoura (err.name = "TimeoutError"). */
export type TimeoutError = Error & { name: "TimeoutError" };

/** Erro usado quando um AbortSignal aborta (err.name = "AbortError"). */
export type AbortError = Error & { name: "AbortError" };

/**
 * Pausa por `ms`. Se `signal` abortar, rejeita com AbortError.
 */
export function sleep(ms: number, signal?: AbortSignal): Promise<void>;

/**
 * Encerra se estourar o tempo. Aceita Promise ou função que retorna Promise.
 * Se estourar, rejeita com TimeoutError (name = "TimeoutError").
 */
export function withTimeout<T>(
  promiseOrFn: Promise<T> | (() => Promise<T>),
  ms: number,
  message?: string
): Promise<T>;

export interface RetryOptions {
  /** Quantas tentativas extras (além da primeira). Default: 3 */
  retries?: number;
  /** Delay mínimo base (ms). Default: 200 */
  minDelayMs?: number;
  /** Delay máximo (ms). Default: 5000 */
  maxDelayMs?: number;
  /** Fator exponencial. Default: 2 */
  factor?: number;
  /** Jitter 0..1. Default: 0.2 */
  jitter?: number;
  /** Decide se deve tentar novamente. Default: sempre true */
  shouldRetry?: (err: any, attempt: number) => boolean;
  /** Permite abortar o retry/sleep. Se abortar, lança AbortError. */
  signal?: AbortSignal;
}

/**
 * Reexecuta uma função async com backoff + jitter.
 * `attempt` começa em 1.
 */
export function retry<T>(
  fn: (attempt: number) => Promise<T>,
  opts?: RetryOptions
): Promise<T>;

/**
 * Limita concorrência de promessas.
 *
 * Uso:
 *  const limit = pLimit(3)
 *  await Promise.all(items.map(x => limit(() => doWork(x))))
 */
export function pLimit(concurrency: number): <T>(
  fn: () => PromiseOrValue<T>
) => Promise<T>;

export interface PMapOptions {
  /** Default: 5 */
  concurrency?: number;
}

/**
 * Map assíncrono com limite de concorrência.
 */
export function pMap<T, U>(
  list: readonly T[],
  mapper: (item: T, idx: number) => PromiseOrValue<U>,
  opts?: PMapOptions
): Promise<U[]>;

export interface QueueOptions {
  /** Default: 1 */
  concurrency?: number;
  /** Callback quando algum job falhar (não engole o erro; só notifica). */
  onError?: (err: any) => void;
}

export interface Queue {
  add<T>(fn: () => PromiseOrValue<T>): Promise<T>;
  onIdle(): Promise<void>;
  /** Quantidade pendente (fila + executando). */
  size(): number;
}

/**
 * Fila simples baseada em pLimit.
 */
export function createQueue(opts?: QueueOptions): Queue;
