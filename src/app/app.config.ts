import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { APP_CONFIG } from './shared/app-config';
import { LakeService } from './services/lake';
import { MockLakeService } from './services/mock-lake';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: APP_CONFIG,
      useFactory: () => ({
        apiBaseUrl:
          location.hostname === 'localhost'
            ? 'https://localhost-placeholder.example.com/api'
            : 'https://placeholder.example.com/api',
        defaultCategory: 'all',
      }),
    },
    {
      provide: LakeService,
      useClass: MockLakeService,
    },
  ],
};
