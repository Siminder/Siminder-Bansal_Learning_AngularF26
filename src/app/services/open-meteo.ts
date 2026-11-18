// Shapes of the parts of the Open-Meteo responses this app uses.
// The API sends more fields than this, which is fine.

// GET {apiBaseUrl}/forecast?latitude=..&longitude=..&current=temperature_2m,wind_speed_10m
export interface ForecastItem {
  latitude: number;
  longitude: number;
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
  };
}

// GET {marineApiBaseUrl}/marine?latitude=..&longitude=..&current=wave_height
export interface MarineItem {
  latitude: number;
  longitude: number;
  current: {
    wave_height: number | null;
  };
}

// With several coordinates Open-Meteo returns an array, with one it returns a single
// object. Normalize so the rest of the code always gets an array.
export function toArray<T>(response: T | T[]): T[] {
  return Array.isArray(response) ? response : [response];
}

// Runtime check: the compiler trusts the <ForecastItem> type, but the server might not
// send what we expect. Malformed items are dropped instead of rendering blanks.
export function isForecastItem(value: unknown): value is ForecastItem {
  const current = (value as ForecastItem | null)?.current;
  return (
    typeof current === 'object' &&
    current !== null &&
    typeof current.temperature_2m === 'number' &&
    typeof current.wind_speed_10m === 'number'
  );
}

export function waveHeightOf(value: unknown): number | null {
  const waveHeight = (value as MarineItem | null)?.current?.wave_height;
  return typeof waveHeight === 'number' ? waveHeight : null;
}
