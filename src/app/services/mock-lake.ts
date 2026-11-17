import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Lake } from '../shared/models/lake';
import { APP_CONFIG, } from '../shared/app-config';

@Injectable()
export class MockLakeService {
  private config = inject(APP_CONFIG);

  apiBaseUrl = this.config.apiBaseUrl;

  private lakeData = signal<Lake[]>([
    {
      id: 1,
      name: 'Mock Lake Alpha',
      waterTemperature: 25,
      waveHeight: 0.2,
      windSpeed: 5,
      waterQuality: 100,
    },
    {
      id: 2,
      name: 'Mock Lake Beta',
      waterTemperature: 10,
      waveHeight: 1.5,
      windSpeed: 30,
      waterQuality: 600,
    },
  ]);

  lakes = this.lakeData.asReadonly();

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
  getLakeById(id: number): Lake | undefined {
    return this.lakes().find((lake) => lake.id === id);
  }

  // Replace the lake with the same id (no duplicate is created)
  updateLake(updated: Lake): void {
    this.lakeData.update((list) => list.map((lake) => (lake.id === updated.id ? updated : lake)));
  }

  nextId(): number {
    return Math.max(0, ...this.lakes().map((lake) => lake.id)) + 1;
  }

  removeLake(name: string): void {
    this.lakeData.update((list) => list.filter((lake) => lake.name !== name));
  }
}
