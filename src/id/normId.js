"use strict";

/**
 * normId(value)
 * Normaliza IDs (Mongo/Mongoose + casos comuns):
 * - ObjectId (toHexString / toString)
 * - { _id: ... }
 * - { $oid: "..." }
 * - Buffer / Uint8Array
 * - string
 *
 * @param {any} value
 * @returns {string}
 */
function normId(value) {
  if (value == null) return "";

  // { _id: ... }
  if (typeof value === "object" && value && "_id" in value) {
    return normId(value._id);
  }

  // { $oid: "..." }
  if (typeof value === "object" && value && typeof value.$oid === "string") {
    return value.$oid.trim();
  }

  // mongoose ObjectId
  if (typeof value?.toHexString === "function") {
    try {
      return String(value.toHexString()).trim();
    } catch {}
  }

  // buffers
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(value)) {
    return value.toString("hex");
  }
  if (value instanceof Uint8Array) {
    return Array.from(value)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // fallback string
  const s = String(value).trim();
  return s;
}

module.exports = normId;
