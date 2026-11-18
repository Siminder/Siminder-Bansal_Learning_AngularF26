import { InjectionToken } from '@angular/core';

export interface AppConfig {
  // Open-Meteo Forecast API (air temperature, wind speed)
  apiBaseUrl: string;
  // Open-Meteo Marine API (wave height) lives on a separate host
  marineApiBaseUrl: string;
  defaultCategory: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
