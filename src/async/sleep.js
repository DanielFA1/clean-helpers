"use strict";

/**
 * sleep(ms, signal?)
 * Pausa por ms. Suporta AbortSignal (Node 16+).
 *
 * @param {number} ms
 * @param {AbortSignal} [signal]
 * @returns {Promise<void>}
 */
function sleep(ms, signal) {
  const t = Number(ms);
  const delay = Number.isFinite(t) && t >= 0 ? t : 0;

  if (!signal) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  if (signal.aborted) {
    const err = new Error("Aborted");
    err.name = "AbortError";
    return Promise.reject(err);
  }

  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      cleanup();
      resolve();
    }, delay);

    const onAbort = () => {
      clearTimeout(id);
      cleanup();
      const err = new Error("Aborted");
      err.name = "AbortError";
      reject(err);
    };

    const cleanup = () => {
      signal.removeEventListener("abort", onAbort);
    };

    signal.addEventListener("abort", onAbort, { once: true });
  });
}

module.exports = sleep;
