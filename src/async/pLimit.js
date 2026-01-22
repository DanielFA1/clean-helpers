"use strict";

/**
 * pLimit(concurrency)
 * Limita concorrência de promessas.
 *
 * Uso:
 *  const limit = pLimit(3)
 *  await Promise.all(items.map(x => limit(() => doWork(x))))
 *
 * @param {number} concurrency
 * @returns {(fn:()=>Promise<any>)=>Promise<any>}
 */
function pLimit(concurrency) {
  const c = Math.max(1, Math.floor(Number(concurrency) || 1));

  let active = 0;
  const queue = [];

  const next = () => {
    if (active >= c) return;
    const job = queue.shift();
    if (!job) return;

    active++;
    job()
      .catch(() => {})
      .finally(() => {
        active--;
        next();
      });
  };

  return function limit(fn) {
    return new Promise((resolve, reject) => {
      queue.push(async () => {
        try {
          const res = await fn();
          resolve(res);
        } catch (e) {
          reject(e);
        }
      });
      next();
    });
  };
}

module.exports = pLimit;
