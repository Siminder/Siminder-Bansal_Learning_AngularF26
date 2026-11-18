import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes} from './app.routes';
import { APP_CONFIG } from './shared/app-config';
import { LakeService } from './services/lake';
import { MockLakeService } from './services/mock-lake';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: APP_CONFIG,
      useValue: {
        apiBaseUrl: 'https://api.open-meteo.com/v1',
        marineApiBaseUrl: 'https://marine-api.open-meteo.com/v1',
        defaultCategory: 'all',
      },
    },
    // To switch back to the real LakeService, remove this provider.
    // Angular will then use the real service registered with providedIn: 'root'.
    {
      provide: LakeService,
      useClass: MockLakeService,
    },
  ],
};
