import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

// How long a cached GET response stays fresh
const CACHE_TTL_MS = 5 * 60 * 1000;

// Keyed by urlWithParams, so the same URL with different params is cached separately
const cache = new Map<string, { response: HttpResponse<unknown>; expiresAt: number }>();

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  // Only GETs are safe to cache
  if (req.method !== 'GET') {
    return next(req);
  }

  const key = req.urlWithParams;
  const cached = cache.get(key);

  if (cached && cached.expiresAt > Date.now()) {
    // Cache hit: answer straight away without calling next(req)
    return of(cached.response.clone());
  }
  cache.delete(key);

  return next(req).pipe(
    tap((event) => {
      // Only successful responses are stored; errors are never cached
      if (event instanceof HttpResponse) {
        cache.set(key, { response: event.clone(), expiresAt: Date.now() + CACHE_TTL_MS });
      }
    }),
  );
};
