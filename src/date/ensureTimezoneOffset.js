"use strict";

const toDateSafe = require("./toDateSafe");

/**
 * ensureTimezoneOffset(dateLike, minutesOffset)
 * Ajusta a data para um offset fixo em minutos, mantendo a "parede" (wall time).
 *
 * Caso de uso:
 * - API manda "2026-01-21T00:00:00" sem timezone.
 * - Você quer tratar isso como local -03:00 (Brasil) e evitar shift ao serializar.
 *
 * Como funciona:
 * - Lê Y/M/D H:M:S como “parede”
 * - Cria um Date UTC com esse wall time
 * - Aplica offset em minutos
 *
 * @param {any} dateLike
 * @param {number} minutesOffset  ex: -180 para -03:00
 * @returns {Date|null}
 */
function ensureTimezoneOffset(dateLike, minutesOffset) {
  const d = toDateSafe(dateLike, null);
  if (!d) return null;

  const off = Number(minutesOffset);
  if (!Number.isFinite(off)) return new Date(d.getTime());

  const y = d.getFullYear();
  const m = d.getMonth();
  const day = d.getDate();
  const hh = d.getHours();
  const mi = d.getMinutes();
  const ss = d.getSeconds();
  const ms = d.getMilliseconds();

  // Cria como se fosse UTC "cru" com os mesmos componentes
  const utc = Date.UTC(y, m, day, hh, mi, ss, ms);

  // Se o offset é -180, isso significa que o "local" está 3h atrás do UTC.
  // Para representar a mesma wall time em UTC, subtrai o offset.
  const adjusted = utc - off * 60 * 1000;

  return new Date(adjusted);
}

module.exports = ensureTimezoneOffset;
