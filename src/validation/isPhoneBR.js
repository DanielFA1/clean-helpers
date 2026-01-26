"use strict";

const cleanDigits = require("../string/cleanDigits");

/**
 * isPhoneBR(value)
 * Validação pragmática de telefone BR:
 * - 10 ou 11 dígitos (sem DDI)
 * - 12 ou 13 dígitos com DDI 55
 *
 * @param {any} value
 * @returns {boolean}
 */
// dentro de src/validation/index.js
function isPhoneBR(value) {
    const s = String(value ?? "").trim();
    if (!s) return false;

    const digits = s.replace(/\D+/g, "");
    if (!digits) return false;

    // DDI explícito: +55... ou 00 55...
    const hasPlus = s.includes("+");
    const has00 = /^\s*00/.test(s);

    if (hasPlus || has00) {
        // se tem DDI, tem que ser 55
        if (!digits.startsWith("55")) return false;

        const rest = digits.slice(2); // remove 55
        return rest.length === 10 || rest.length === 11;
    }

    // Sem DDI explícito: BR local (DDD + número)
    return digits.length === 10 || digits.length === 11;
}

module.exports = isPhoneBR;
