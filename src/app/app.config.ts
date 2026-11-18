import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { APP_CONFIG } from './shared/app-config';
import { cacheInterceptor } from './interceptors/cache-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor';
import { errorInterceptor } from './interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    // Interceptors run in array order on the way out, and in reverse on the way back.
    // - cacheInterceptor goes first on purpose: a cache hit returns of(response) before
    //   the others run, so the loading indicator doesn't flash and there's no error to catch.
    // - loadingInterceptor and errorInterceptor can go in either order for this app:
    //   finalize lowers the loading count on success AND error, and errorInterceptor
    //   rethrows the error instead of swallowing it, so neither changes what the other sees.
    provideHttpClient(
      withInterceptors([cacheInterceptor, loadingInterceptor, errorInterceptor]),
    ),
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
