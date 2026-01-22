"use strict";

/**
 * distanceInMeters(lat1, lon1, lat2, lon2)
 * Haversine.
 *
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {number}
 */
function distanceInMeters(lat1, lon1, lat2, lon2) {
  const a1 = Number(lat1), o1 = Number(lon1), a2 = Number(lat2), o2 = Number(lon2);
  if (![a1, o1, a2, o2].every(Number.isFinite)) return 0;

  const R = 6371000; // m
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(a2 - a1);
  const dLon = toRad(o2 - o1);

  const la1 = toRad(a1);
  const la2 = toRad(a2);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

module.exports = distanceInMeters;
