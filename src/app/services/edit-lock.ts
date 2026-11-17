import { Injectable, signal } from '@angular/core';

// Holds whether editing is locked. The edit guard and the navbar button both
// read this signal, so they always agree.
@Injectable({
  providedIn: 'root',
})
export class EditLock {
  guardEnabled = signal(true);

  toggle(): void {
    this.guardEnabled.update((enabled) => !enabled);
  }
}
