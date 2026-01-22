"use strict";

/**
 * isValidDate(d)
 * @param {any} d
 * @returns {boolean}
 */
function isValidDate(d) {
  return d instanceof Date && Number.isFinite(d.getTime());
}

module.exports = isValidDate;
