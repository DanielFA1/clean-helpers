// src/index.d.ts

// =======================
// Namespaces (mesmo shape do runtime)
// =======================
export { default as money } from "./money";
export { default as string } from "./string";
export { default as number } from "./number";
export { default as date } from "./date";
export { default as async } from "./async";
export { default as validation } from "./validation";

export { default as regex } from "./regex";
export { default as search } from "./search";
export { default as http } from "./http";
export { default as geo } from "./geo";
export { default as stats } from "./stats";
export { default as cache } from "./cache";
export { default as parse } from "./parse";
export { default as id } from "./id";

// =======================
// Flat exports (spreads do src/index.js)
// =======================

// money
export {
  parseMoneyStrict,
  parseMoney,
  moneyToCents,
  centsToMoney,
  formatBRLPlain,
  formatBRL,
} from "./money";

// string
export {
  normalizePTBR,
  cleanDigits,
  casefold,
  includesLoose,
  slugify,
  titleCasePTBR,
  splitNameBrandSize,
} from "./string";

// number
export { toNumberSafe, clamp, roundTo, pct, sum, avg, range } from "./number";

// date
export {
  isValidDate,
  toDateSafe,
  startOfDay,
  endOfDay,
  addDays,
  daysBetween,
  formatDateBR,
  formatTimeBR,
  formatBRDatetime,
  parseDateBR,
  parseBRDatetime,
  parseTimeBR,
  inRange,
  ensureTimezoneOffset,
  parseISODateOrBR,
  diffHumanBR,
  monthKey,
  weekKeyISO,
} from "./date";

// async
export { sleep, withTimeout, retry, pLimit, pMap, createQueue } from "./async";

// validation
export {
  isEmpty,
  isEmail,
  isCPF,
  isCNPJ,
  isEAN13,
  isPhoneBR,
  isCEP,
  isNCM,
  isCEST,
  assert,
  pickValid,
} from "./validation";

// regex
export { escapeRegex, safeRegex } from "./regex";

// search
export { normalizeSearchText, makeSearchTokens } from "./search";

// http
export { wantsJson } from "./http";

// geo
export { distanceInMeters } from "./geo";

// stats
export { quantile } from "./stats";

// cache
export { isFresh } from "./cache";

// parse
export { flagEnabled, parseWeekdays, parseBlackouts } from "./parse";

// id
export { normId } from "./id";

// =======================
// Type re-exports (opcionais mas úteis)
// =======================

// money types
export type {
  MoneyStrictFailReason,
  ParseMoneyStrictOptions,
  ParseMoneyStrictOk,
  ParseMoneyStrictFail,
  ParseMoneyStrictResult,
  ParseMoneyOptions,
  MoneyToCentsOptions,
  CentsToMoneyOptions,
  FormatBRLPlainOptions,
  FormatBRLOptions,
} from "./money";

// number: (sem types públicos)

// date types
export type {
  DateLike,
  TimeParts,
  TimeFormatOptions,
  InRangeOptions,
  DiffHumanOptions,
} from "./date";

// async types
export type {
  PromiseOrValue,
  TimeoutError,
  AbortError,
  RetryOptions,
  PMapOptions,
  QueueOptions,
  Queue,
} from "./async";

// validation types
export type {
  ValidationError,
  PickValidType,
  PickValidOptions,
  PickValidResult,
} from "./validation";

// regex types
export type { SafeRegexOptions } from "./regex";

// search types
export type { MakeSearchTokensOptions } from "./search";

// http types
export type { ExpressLikeRequest } from "./http";

// geo types
export type { NumericLike } from "./geo";

// stats: (sem types públicos)

// cache types
export type { FreshTimestampLike, FreshEntry } from "./cache";

// parse: (sem types públicos)

// id: (sem types públicos)

// =======================
// Default export (espelha o objeto do module.exports do src/index.js)
// =======================
import moneyNs from "./money";
import stringNs from "./string";
import numberNs from "./number";
import dateNs from "./date";
import asyncNs from "./async";
import validationNs from "./validation";
import regexNs from "./regex";
import searchNs from "./search";
import httpNs from "./http";
import geoNs from "./geo";
import statsNs from "./stats";
import cacheNs from "./cache";
import parseNs from "./parse";
import idNs from "./id";

export type CleanHelpers = {
  money: typeof moneyNs;
  string: typeof stringNs;
  number: typeof numberNs;
  date: typeof dateNs;
  async: typeof asyncNs;
  validation: typeof validationNs;
  regex: typeof regexNs;
  search: typeof searchNs;
  http: typeof httpNs;
  geo: typeof geoNs;
  stats: typeof statsNs;
  cache: typeof cacheNs;
  parse: typeof parseNs;
  id: typeof idNs;
} & typeof moneyNs &
  typeof stringNs &
  typeof numberNs &
  typeof dateNs &
  typeof asyncNs &
  typeof validationNs &
  typeof regexNs &
  typeof searchNs &
  typeof httpNs &
  typeof geoNs &
  typeof statsNs &
  typeof cacheNs &
  typeof parseNs &
  typeof idNs;

declare const cleanHelpers: CleanHelpers;
export default cleanHelpers;
