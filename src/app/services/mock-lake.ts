import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Lake } from '../shared/models/lake';
import { APP_CONFIG, FEATURE_FLAGS } from '../shared/app-config';

@Injectable()
export class MockLakeService {
  private config = inject(APP_CONFIG);


  apiBaseUrl = this.config.apiBaseUrl;

  private lakeData = signal<Lake[]>([
    {
      name: 'Mock Lake Alpha',
      waterTemperature: 25,
      waveHeight: 0.2,
      windSpeed: 5,
      waterQuality: 100,
    },
    {
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

  removeLake(name: string): void {
    this.lakeData.update((list) => list.filter((lake) => lake.name !== name));
  }
}
