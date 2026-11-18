import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Lake } from '../shared/models/lake';
import { APP_CONFIG } from '../shared/app-config';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockLakeService {
  private config = inject(APP_CONFIG);

  apiBaseUrl = this.config.apiBaseUrl;

  private lakeData = signal<Lake[]>([
    {
      id: 'mock-alpha',
      name: 'Mock Lake Alpha',
      airTemperature: 25,
      waveHeight: 0.2,
      windSpeed: 5,
      waterQuality: 100,
      activities: ['Swimming', 'Paddleboarding'],
    },
    {
      id: 'mock-beta',
      name: 'Mock Lake Beta',
      airTemperature: 10,
      waveHeight: 1.5,
      windSpeed: 30,
      waterQuality: 600,
      activities: ['Fishing'],
    },
  ]);

  lakes = this.lakeData.asReadonly();

  // Same shape as LakeService, so it can still be swapped in from app.config.ts
  isLoading = signal(false);
  error = signal<string | null>(null);

  load(): void {}

  whenLoaded(): Observable<void> {
    return of(undefined);
  }

  safeLakes = computed(() => this.lakes().filter((lake) => lake.waterQuality <= 300));

  safeLakeCount = computed(() => this.safeLakes().length);

  constructor() {
    effect(() => {
      console.log('Mock lake count:', this.lakes().length);
    });
  }

  addLake(newLake: Lake): void {
    this.lakeData.update((list) => [...list, newLake]);
  }

  // Find one lake by its id
  getLakeById(id: string): Lake | undefined {
    return this.lakes().find((lake) => lake.id === id);
  }

  // Replace the lake with the same id (no duplicate is created)
  updateLake(updated: Lake): void {
    this.lakeData.update((list) => list.map((lake) => (lake.id === updated.id ? updated : lake)));
  }

  newId(): string {
    return crypto.randomUUID();
  }

  removeLake(id: string): void {
    this.lakeData.update((list) => list.filter((lake) => lake.id !== id));
  }
}
