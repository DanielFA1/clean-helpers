"use strict";

const toDateSafe = require("./toDateSafe");

/**
 * diffHumanBR(a, b=now, opts)
 * Retorna diferença humana em pt-BR:
 * - "agora" (<= 20s)
 * - "há 2 minutos" / "em 3 horas"
 *
 * @param {any} a
 * @param {any} [b]
 * @param {object} [opts]
 * @param {Date} [opts.now] - alternativa a passar b
 * @param {number} [opts.justNowSeconds=20]
 * @returns {string}
 */
function diffHumanBR(a, b, opts = {}) {
  const justNowSeconds = Number.isFinite(opts.justNowSeconds) ? opts.justNowSeconds : 20;

  const now = opts.now instanceof Date ? opts.now : null;

  const d1 = toDateSafe(a, null);
  const d2 = now ? now : toDateSafe(b ?? new Date(), null);

  if (!d1 || !d2) return "";

  const diffMs = d1.getTime() - d2.getTime();
  const future = diffMs > 0;
  const abs = Math.abs(diffMs);

  const sec = Math.round(abs / 1000);

  if (sec <= justNowSeconds) return "agora";

  const MIN = 60;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;

  function plural(n, one, many) {
    return n === 1 ? one : many;
  }

  let n, unit;

  if (sec < HOUR) {
    n = Math.round(sec / MIN);
    unit = plural(n, "minuto", "minutos");
  } else if (sec < DAY) {
    n = Math.round(sec / HOUR);
    unit = plural(n, "hora", "horas");
  } else if (sec < WEEK) {
    n = Math.round(sec / DAY);
    unit = plural(n, "dia", "dias");
  } else {
    n = Math.round(sec / WEEK);
    unit = plural(n, "semana", "semanas");
  }

  return future ? `em ${n} ${unit}` : `há ${n} ${unit}`;
}

module.exports = diffHumanBR;
