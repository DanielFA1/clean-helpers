"use strict";

const toDateSafe = require("./toDateSafe");

/**
 * weekKeyISO(dateLike)
 * Retorna "YYYY-Www" (ISO week number).
 *
 * @param {any} dateLike
 * @returns {string}
 */
function weekKeyISO(dateLike) {
  const d = toDateSafe(dateLike, null);
  if (!d) return "";

  // ISO week algorithm:
  // - move para quinta-feira da semana atual
  // - semana 1 é a semana com 4 de janeiro (ou a primeira quinta)
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);

  // getDay(): 0=Dom ... 6=Sáb
  // ISO: 1=Seg ... 7=Dom
  const day = date.getDay() === 0 ? 7 : date.getDay();

  // Ajusta para quinta-feira
  date.setDate(date.getDate() + (4 - day));

  const year = date.getFullYear();

  // Primeiro dia do ano ISO
  const yearStart = new Date(year, 0, 1);
  yearStart.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((date - yearStart) / 86400000) + 1;
  const week = Math.ceil(diffDays / 7);

  return `${year}-W${String(week).padStart(2, "0")}`;
}

module.exports = weekKeyISO;
