"use strict";

const sleep = require("./sleep");

/**
 * retry(fn, opts)
 * Reexecuta uma função async com backoff + jitter.
 *
 * @template T
 * @param {(attempt:number) => Promise<T>} fn
 * @param {object} [opts]
 * @param {number} [opts.retries=3]
 * @param {number} [opts.minDelayMs=200]
 * @param {number} [opts.maxDelayMs=5000]
 * @param {number} [opts.factor=2]
 * @param {number} [opts.jitter=0.2] - 0..1 (percentual rand no delay)
 * @param {(err:any, attempt:number) => boolean} [opts.shouldRetry]
 * @param {AbortSignal} [opts.signal]
 * @returns {Promise<T>}
 */
async function retry(fn, opts = {}) {
  const retries = Number.isFinite(opts.retries) ? opts.retries : 3;
  const minDelayMs = Number.isFinite(opts.minDelayMs) ? opts.minDelayMs : 200;
  const maxDelayMs = Number.isFinite(opts.maxDelayMs) ? opts.maxDelayMs : 5000;
  const factor = Number.isFinite(opts.factor) ? opts.factor : 2;
  const jitter = Number.isFinite(opts.jitter) ? Math.max(0, Math.min(1, opts.jitter)) : 0.2;
  const shouldRetry =
    typeof opts.shouldRetry === "function" ? opts.shouldRetry : () => true;

  const signal = opts.signal;

  let lastErr;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    if (signal?.aborted) {
      const err = new Error("Aborted");
      err.name = "AbortError";
      throw err;
    }

    try {
      return await fn(attempt);
    } catch (err) {
      lastErr = err;

      const canRetry = attempt <= retries && shouldRetry(err, attempt);
      if (!canRetry) throw err;

      // backoff
      const base = Math.min(maxDelayMs, minDelayMs * Math.pow(factor, attempt - 1));
      const rand = 1 + (Math.random() * 2 - 1) * jitter; // 1 ± jitter
      const delay = Math.max(0, Math.floor(base * rand));

      await sleep(delay, signal);
    }
  }

  // nunca deve cair aqui, mas por segurança
  throw lastErr;
}

module.exports = retry;
