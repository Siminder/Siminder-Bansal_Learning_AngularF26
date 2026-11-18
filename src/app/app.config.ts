import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { APP_CONFIG } from './shared/app-config';
import { cacheInterceptor } from './interceptors/cache-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    // Cache first: a cache hit returns before the loading interceptor runs, so the
    // indicator only shows for requests that really go to the network.
    provideHttpClient(withInterceptors([cacheInterceptor, loadingInterceptor])),
    {
      provide: APP_CONFIG,
      useValue: {
        apiBaseUrl: 'https://api.open-meteo.com/v1',
        marineApiBaseUrl: 'https://marine-api.open-meteo.com/v1',
        defaultCategory: 'all',
      },
    },
    // LakeService (providedIn: 'root') now loads live data from Open-Meteo.
    // To use the hard-coded mock data instead, add this provider back:
    // { provide: LakeService, useClass: MockLakeService },
  ],
};
