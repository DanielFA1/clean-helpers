// src/geo/index.d.ts

export type NumericLike = number | string;

/**
 * distanceInMeters(lat1, lon1, lat2, lon2)
 * Haversine. Se algum valor não for finito, retorna 0.
 */
export function distanceInMeters(
  lat1: NumericLike,
  lon1: NumericLike,
  lat2: NumericLike,
  lon2: NumericLike
): number;

declare const _default: {
  distanceInMeters: typeof distanceInMeters;
};

export default _default;
