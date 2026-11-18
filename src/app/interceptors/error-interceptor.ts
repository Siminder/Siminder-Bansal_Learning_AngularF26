import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error';

// Turns any failed request into a friendly banner message, then rethrows the
// error so the service that made the request can still react (e.g. LakeService
// shows its own error and "Try again" button on the list page).
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        errorService.show(messageFor(error.status));
      }
      return throwError(() => error);
    }),
  );
};

function messageFor(status: number): string {
  if (status === 0) {
    return 'Could not reach the weather service. Check your internet connection (or the request was blocked by the browser).';
  }
  if (status === 400) {
    return 'The weather service rejected the request (400 Bad Request).';
  }
  if (status === 404) {
    return 'The requested weather data was not found (404).';
  }
  if (status === 429) {
    return 'Too many requests to the weather service. Please wait a moment and try again (429).';
  }
  if (status >= 500) {
    return `The weather service is having problems right now (${status}). Please try again later.`;
  }
  return `Something went wrong loading weather data (status ${status}).`;
}
