// src/regex/index.d.ts

export function escapeRegex(text: any): string;

export interface SafeRegexOptions {
  /** default: "i" */
  flags?: string;
  /** default: 80 */
  maxLen?: number;
    /** default: true */
  emptyMatchesNothing?: boolean;
}

export function safeRegex(q: any, opts?: SafeRegexOptions): RegExp;

declare const _default: {
  escapeRegex: typeof escapeRegex;
  safeRegex: typeof safeRegex;
};

export default _default;
