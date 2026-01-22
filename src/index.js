"use strict";

// módulos (namespaces)
const money = require("./money");
const string = require("./string");
const number = require("./number");
const date = require("./date");
const asyncH = require("./async");
const validation = require("./validation");

const regex = require("./regex");
const search = require("./search");
const http = require("./http");
const geo = require("./geo");
const stats = require("./stats");
const cache = require("./cache");
const parse = require("./parse");
const id = require("./id");

// Export “flat” (pra quem gosta de: const { parseMoney, clamp } = require("br-helpers"))
// + Export por namespace (pra quem gosta de: const { money } = require("br-helpers"))
module.exports = {
  // namespaces
  money,
  string,
  number,
  date,
  async: asyncH,
  validation,
  regex,
  search,
  http,
  geo,
  stats,
  cache,
  parse,
  id,

  // ------------- money (flat) -------------
  parseMoney: money.parseMoney,
  formatBRL: money.formatBRL,
  parseMoneyStrict: money.parseMoneyStrict,
  moneyToCents: money.moneyToCents,
  centsToMoney: money.centsToMoney,
  formatBRLPlain: money.formatBRLPlain,

  // ------------- string (flat) -------------
  cleanDigits: string.cleanDigits,
  casefold: string.casefold,
  includesLoose: string.includesLoose,
  titleCasePTBR: string.titleCasePTBR,
  splitNameBrandSize: string.splitNameBrandSize,

  // ------------- number (flat) -------------
  toNumberSafe: number.toNumberSafe,
  clamp: number.clamp,
  roundTo: number.roundTo,
  pct: number.pct,
  sum: number.sum,
  avg: number.avg,
  range: number.range,

  // ------------- date (flat) -------------
  toDateSafe: date.toDateSafe,
  parseDateBR: date.parseDateBR,
  formatDateBR: date.formatDateBR,
  startOfDay: date.startOfDay,
  endOfDay: date.endOfDay,
  addDays: date.addDays,
  daysBetween: date.daysBetween,
  inRange: date.inRange,
  formatBRDatetime: date.formatBRDatetime,
  parseBRDatetime: date.parseBRDatetime,
  formatTimeBR: date.formatTimeBR,
  parseTimeBR: date.parseTimeBR,
  ensureTimezoneOffset: date.ensureTimezoneOffset,
  parseISODateOrBR: date.parseISODateOrBR,
  diffHumanBR: date.diffHumanBR,
  monthKey: date.monthKey,
  weekKeyISO: date.weekKeyISO,

  // ------------- async (flat) -------------
  sleep: asyncH.sleep,
  withTimeout: asyncH.withTimeout,
  retry: asyncH.retry,
  pLimit: asyncH.pLimit,
  pMap: asyncH.pMap,
  createQueue: asyncH.createQueue,

  // ------------- validation (flat) -------------
  isEmpty: validation.isEmpty,
  isEmail: validation.isEmail,
  isCPF: validation.isCPF,
  isCNPJ: validation.isCNPJ,
  isEAN13: validation.isEAN13,
  isPhoneBR: validation.isPhoneBR,
  isCEP: validation.isCEP,
  isNCM: validation.isNCM,
  isCEST: validation.isCEST,
  pickValid: validation.pickValid,
  assertValid: validation.assert,

  // ------------- regex/search/http/geo/stats/cache/parse/id (flat) -------------
  escapeRegex: regex.escapeRegex,
  safeRegex: regex.safeRegex,

  normalizeSearchText: search.normalizeSearchText,
  makeSearchTokens: search.makeSearchTokens,

  wantsJson: http.wantsJson,

  distanceInMeters: geo.distanceInMeters,

  quantile: stats.quantile,

  isFresh: cache.isFresh,

  flagEnabled: parse.flagEnabled,
  parseWeekdays: parse.parseWeekdays,
  parseBlackouts: parse.parseBlackouts,

  normId: id.normId,
};
