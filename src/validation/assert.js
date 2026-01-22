"use strict";

/**
 * assert(condition, message, details?)
 * Joga um erro padronizado com code.
 *
 * @param {any} condition
 * @param {string} message
 * @param {object} [details]
 * @param {string} [code="VALIDATION_ERROR"]
 */
function assert(condition, message, details, code = "VALIDATION_ERROR") {
  if (condition) return;

  const err = new Error(message || "Validation error");
  err.name = "ValidationError";
  err.code = code;
  if (details && typeof details === "object") err.details = details;

  throw err;
}

module.exports = assert;
