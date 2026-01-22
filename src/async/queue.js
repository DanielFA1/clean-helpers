"use strict";

const pLimit = require("./pLimit");

/**
 * createQueue(opts)
 * Fila simples baseada em pLimit.
 *
 * @param {object} [opts]
 * @param {number} [opts.concurrency=1]
 * @param {(err:any)=>void} [opts.onError]
 * @returns {{
 *   add: (fn:()=>Promise<any>)=>Promise<any>,
 *   onIdle: ()=>Promise<void>,
 *   size: ()=>number
 * }}
 */
function createQueue(opts = {}) {
  const concurrency = Number.isFinite(opts.concurrency) ? opts.concurrency : 1;
  const onError = typeof opts.onError === "function" ? opts.onError : null;

  const limit = pLimit(concurrency);

  let pending = 0;
  let idleResolvers = [];

  function maybeResolveIdle() {
    if (pending === 0 && idleResolvers.length) {
      const rs = idleResolvers;
      idleResolvers = [];
      rs.forEach((r) => r());
    }
  }

  function add(fn) {
    pending++;

    return limit(async () => {
      try {
        return await fn();
      } catch (err) {
        if (onError) onError(err);
        throw err;
      } finally {
        pending--;
        maybeResolveIdle();
      }
    });
  }

  function onIdle() {
    if (pending === 0) return Promise.resolve();
    return new Promise((resolve) => idleResolvers.push(resolve));
  }

  function size() {
    return pending;
  }

  return { add, onIdle, size };
}

module.exports = createQueue;
