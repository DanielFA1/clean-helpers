"use strict";

/**
 * flagEnabled(value, fallback=false)
 * Interpreta boolean de query/body/env:
 * - true: true, 1, "1", "true", "yes", "y", "on", "sim"
 * - false: false, 0, "0", "false", "no", "n", "off", "nao", "não"
 *
 * @param {any} value
 * @param {boolean} [fallback=false]
 * @returns {boolean}
 */
function flagEnabled(value, fallback = false) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;

  const s = String(value ?? "").trim().toLowerCase();
  if (!s) return !!fallback;

  if (["1", "true", "yes", "y", "on", "sim"].includes(s)) return true;
  if (["0", "false", "no", "n", "off", "nao", "não"].includes(s)) return false;

  return !!fallback;
}

module.exports = flagEnabled;
