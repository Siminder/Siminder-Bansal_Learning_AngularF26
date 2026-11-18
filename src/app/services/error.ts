import { Injectable, signal } from '@angular/core';

// Holds the message shown in the global error banner (null = no banner).
@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  message = signal<string | null>(null);

  show(message: string): void {
    this.message.set(message);
  }

  clear(): void {
    this.message.set(null);
  }
}
