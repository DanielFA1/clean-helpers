"use strict";

/**
 * withTimeout(promiseOrFn, ms, message?)
 * Encerra se estourar o tempo. Aceita Promise ou função async.
 *
 * @template T
 * @param {Promise<T> | (() => Promise<T>)} promiseOrFn
 * @param {number} ms
 * @param {string} [message]
 * @returns {Promise<T>}
 */
function withTimeout(promiseOrFn, ms, message) {
  const t = Number(ms);
  const timeoutMs = Number.isFinite(t) && t > 0 ? t : 0;

  const p = typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;

  if (!timeoutMs) return p;

  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      const err = new Error(message || `Timeout after ${timeoutMs}ms`);
      err.name = "TimeoutError";
      reject(err);
    }, timeoutMs);

    p.then(
      (v) => {
        clearTimeout(id);
        resolve(v);
      },
      (e) => {
        clearTimeout(id);
        reject(e);
      }
    );
  });
}

module.exports = withTimeout;
