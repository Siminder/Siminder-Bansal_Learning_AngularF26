import { computed, Injectable, signal } from '@angular/core';

// Counts HTTP requests in progress. The loading interceptor increases and
// decreases it, and the navbar shows "Loading…" while it's above zero.
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private activeRequests = signal(0);

  isLoading = computed(() => this.activeRequests() > 0);

  increase(): void {
    this.activeRequests.update((count) => count + 1);
  }

  decrease(): void {
    this.activeRequests.update((count) => Math.max(0, count - 1));
  }
}
