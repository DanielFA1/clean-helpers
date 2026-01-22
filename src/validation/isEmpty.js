"use strict";

/**
 * isEmpty(value)
 * Considera vazio:
 * - null/undefined
 * - string vazia/trim
 * - array length=0
 * - object sem keys
 *
 * @param {any} value
 * @returns {boolean}
 */
function isEmpty(value) {
  if (value == null) return true;

  if (typeof value === "string") return value.trim().length === 0;

  if (Array.isArray(value)) return value.length === 0;

  if (typeof value === "object") return Object.keys(value).length === 0;

  return false;
}

module.exports = isEmpty;
