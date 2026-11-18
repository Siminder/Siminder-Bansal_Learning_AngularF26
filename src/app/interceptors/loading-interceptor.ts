import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading';

// Sees every request the app makes, so no page needs its own loading code.
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.increase();

  // finalize runs on success, error or cancel, so the count always goes back down
  return next(req).pipe(finalize(() => loadingService.decrease()));
};
