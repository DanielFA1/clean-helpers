"use strict";

/**
 * isEmail(email)
 * Validação pragmática (não tenta “provar” RFC 5322).
 *
 * @param {any} email
 * @returns {boolean}
 */
function isEmail(email) {
  const s = String(email ?? "").trim();
  if (!s) return false;
  if (s.length > 254) return false;

  // simples e eficiente para uso comum
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

module.exports = isEmail;
