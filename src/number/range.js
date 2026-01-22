"use strict";

const toNumberSafe = require("./toNumberSafe");

/**
 * range(start, end, step=1)
 * Cria array numérico inclusivo por padrão quando end >= start.
 * - range(1, 5) => [1,2,3,4,5]
 * - range(5, 1, -2) => [5,3,1]
 *
 * @param {any} start
 * @param {any} end
 * @param {any} [step=1]
 * @returns {number[]}
 */
function range(start, end, step = 1) {
  const a = toNumberSafe(start, 0);
  const b = toNumberSafe(end, 0);
  let st = toNumberSafe(step, 1);

  if (!Number.isFinite(st) || st === 0) st = a <= b ? 1 : -1;

  const out = [];

  if (a === b) return [a];

  // Ajusta step se direção estiver errada
  if (a < b && st < 0) st = Math.abs(st);
  if (a > b && st > 0) st = -Math.abs(st);

  if (st > 0) {
    for (let x = a; x <= b; x += st) out.push(x);
  } else {
    for (let x = a; x >= b; x += st) out.push(x);
  }

  return out;
}

module.exports = range;
