import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiBaseUrl: string;
  defaultCategory: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface FeatureFlags {
  showWindSpeed: boolean;
  showWaveHeight: boolean;
}

export const FEATURE_FLAGS = new InjectionToken<FeatureFlags>('feature.flags');
