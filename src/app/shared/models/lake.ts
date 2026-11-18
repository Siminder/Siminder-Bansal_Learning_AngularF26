// Fields the app uses. Air temperature, wind speed and wave height come from
// Open-Meteo; name, water quality and activities are kept locally because
// the API doesn't provide them.
export interface Lake {
  id: string; // string so API lakes ('lake-huron') and added lakes (UUIDs) can't clash
  name: string;
  airTemperature: number; // °C, Open-Meteo current.temperature_2m
  windSpeed: number; // km/h, Open-Meteo current.wind_speed_10m
  waveHeight: number | null; // m, Open-Meteo Marine current.wave_height (null if unavailable)
  waterQuality: number;
  activities?: string[];
}
