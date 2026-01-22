"use strict";

const pLimit = require("./pLimit");

/**
 * pMap(list, mapper, opts)
 * Map assíncrono com limite de concorrência.
 *
 * @template T,U
 * @param {T[]} list
 * @param {(item:T, idx:number)=>Promise<U>} mapper
 * @param {object} [opts]
 * @param {number} [opts.concurrency=5]
 * @returns {Promise<U[]>}
 */
async function pMap(list, mapper, opts = {}) {
  const arr = Array.isArray(list) ? list : [];
  const concurrency = Number.isFinite(opts.concurrency) ? opts.concurrency : 5;

  const limit = pLimit(concurrency);

  const tasks = arr.map((item, idx) =>
    limit(() => mapper(item, idx))
  );

  return Promise.all(tasks);
}

module.exports = pMap;
