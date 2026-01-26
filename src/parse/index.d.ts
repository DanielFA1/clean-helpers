// src/parse/index.d.ts

/**
 * Interpreta boolean de query/body/env:
 * - true: true, 1, "1", "true", "yes", "y", "on", "sim"
 * - false: false, 0, "0", "false", "no", "n", "off", "nao", "não"
 */
export function flagEnabled(value: any, fallback?: boolean): boolean;

/**
 * Retorna array de dias da semana (0..6), 0=Dom, 1=Seg, ... 6=Sáb
 * Aceita:
 * - "seg,ter,qua" / "1,2,3" / "seg qua sex"
 * - array ["seg","sex"] / [1,5]
 */
export function parseWeekdays(input: any): number[];

/**
 * Interpreta “blackouts” de data (dias bloqueados), retornando ranges em ms.
 * Aceita:
 * - "2026-01-21" / "21/01/2026"
 * - "2026-01-21..2026-01-25" / "21/01/2026..25/01/2026"
 * - múltiplos separados por vírgula/;| espaço
 * - array de strings
 *
 * Retorna: [{ startMs, endMs }]
 */
export function parseBlackouts(
  input: any
): Array<{ startMs: number; endMs: number }>;

declare const _default: {
  flagEnabled: typeof flagEnabled;
  parseWeekdays: typeof parseWeekdays;
  parseBlackouts: typeof parseBlackouts;
};

export default _default;
