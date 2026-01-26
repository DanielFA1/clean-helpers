// src/date/index.d.ts

export type DateLike = Date | number | string | null | undefined;

export interface TimeParts {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeFormatOptions {
  withSeconds?: boolean;
}

export interface InRangeOptions {
  inclusive?: boolean;
}

export interface DiffHumanOptions {
  /** alternativa a passar `b` */
  now?: Date;
  /** default: 20 */
  justNowSeconds?: number;
}

/** d instanceof Date && !isNaN(d.getTime()) */
export function isValidDate(d: unknown): d is Date;

/**
 * Converte para Date com regras pragmáticas:
 * - Date -> clone
 * - number -> ms (13 dígitos) ou s (10 dígitos)
 * - string -> Date.parse/ISO e depois tenta dd/mm/yyyy
 */
export function toDateSafe(value: unknown, fallback?: Date | null): Date | null;

export function startOfDay(dateLike: DateLike): Date | null;
export function endOfDay(dateLike: DateLike): Date | null;

/** Soma dias preservando horário. */
export function addDays(dateLike: DateLike, days: number): Date | null;

/** Diferença em dias inteiros entre datas (b - a), ignorando horas. */
export function daysBetween(a: DateLike, b: DateLike): number;

/** "dd/mm/yyyy" (retorna "" se inválido). */
export function formatDateBR(dateLike: DateLike): string;

/** "HH:mm" ou "HH:mm:ss" (retorna "" se inválido). */
export function formatTimeBR(dateLike: DateLike, opts?: TimeFormatOptions): string;

/** "dd/mm/yyyy HH:mm" ou com segundos (retorna "" se inválido). */
export function formatBRDatetime(dateLike: DateLike, opts?: TimeFormatOptions): string;

/** parse "dd/mm/yyyy" -> Date|null */
export function parseDateBR(value: unknown): Date | null;

/** parse "dd/mm/yyyy HH:mm[:ss]" -> Date|null */
export function parseBRDatetime(value: unknown): Date | null;

/** parse "HH:mm[:ss]" -> {hours, minutes, seconds} | null */
export function parseTimeBR(value: unknown): TimeParts | null;

/**
 * Verifica se date está entre start e end.
 * opts.inclusive default: true
 */
export function inRange(
  dateLike: DateLike,
  startLike: DateLike,
  endLike: DateLike,
  opts?: InRangeOptions
): boolean;

/**
 * Ajusta a data para um offset fixo em minutos, mantendo “wall time”.
 * minutesOffset ex: -180 para -03:00
 */
export function ensureTimezoneOffset(dateLike: DateLike, minutesOffset: number): Date | null;

/**
 * Aceita Date | number (ms/s) | ISO date-only "YYYY-MM-DD" (local) | ISO datetime | BR date | BR datetime
 * Retorna Date|null
 */
export function parseISODateOrBR(value: unknown): Date | null;

/**
 * Retorna diferença humana em pt-BR:
 * - "agora" (<= justNowSeconds)
 * - "há 2 minutos" / "em 3 horas"
 */
export function diffHumanBR(a: DateLike, b?: DateLike, opts?: DiffHumanOptions): string;

/** "YYYY-MM" (retorna "" se inválido) */
export function monthKey(dateLike: DateLike): string;

/** "YYYY-Www" (retorna "" se inválido) */
export function weekKeyISO(dateLike: DateLike): string;

declare const _default: {
  isValidDate: typeof isValidDate;
  toDateSafe: typeof toDateSafe;
  startOfDay: typeof startOfDay;
  endOfDay: typeof endOfDay;
  addDays: typeof addDays;
  daysBetween: typeof daysBetween;
  formatDateBR: typeof formatDateBR;
  parseDateBR: typeof parseDateBR;
  inRange: typeof inRange;

  formatBRDatetime: typeof formatBRDatetime;
  parseBRDatetime: typeof parseBRDatetime;
  formatTimeBR: typeof formatTimeBR;
  parseTimeBR: typeof parseTimeBR;
  ensureTimezoneOffset: typeof ensureTimezoneOffset;

  parseISODateOrBR: typeof parseISODateOrBR;
  diffHumanBR: typeof diffHumanBR;
  monthKey: typeof monthKey;
  weekKeyISO: typeof weekKeyISO;
};

export default _default;
