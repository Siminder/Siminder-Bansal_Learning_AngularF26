import {signal, computed, effect } from '@angular/core';
import { Lake } from '../shared/models/lake';
import { inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../shared/app-config';

@Injectable({
  providedIn: 'root',
})
export class LakeService {
  // Private signal holding the lake data
  private lakeData = signal<Lake[]>([
    {
      id: 'lake-huron',
      name: 'Lake Huron',
      airTemperature: 16,
      waveHeight: 0.8,
      windSpeed: 20,
      waterQuality: 500,
      activities: ['Swimming', 'Sailing'],
    },
    {
      id: 'lake-erie',
      name: 'Lake Erie',
      airTemperature: 20,
      waveHeight: 0.3,
      windSpeed: 10,
      waterQuality: 500,
      activities: ['Fishing'],
    },
    {
      id: 'lake-ontario',
      name: 'Lake Ontario',
      airTemperature: 18,
      waveHeight: 0.5,
      windSpeed: 15,
      waterQuality: 250,
      activities: ['Kayaking', 'Fishing'],
    },
    {
      id: 'lake-simcoe',
      name: 'Lake Simcoe',
      airTemperature: 17,
      waveHeight: null,
      windSpeed: 12,
      waterQuality: 320,
      activities: ['Ice fishing'],
    },
  ]);

  // Public read-only signal
  lakes = this.lakeData.asReadonly();

  // First computed: filter lakes using your water-quality rule
  safeLakes = computed(() => this.lakes().filter((lake) => lake.waterQuality <= 300));

  // Second computed: derive the count from the first computed
  safeLakeCount = computed(() => this.safeLakes().length);

  constructor() {
    // Effect: log the current number of lakes
    effect(() => {
      console.log('Number of lakes:', this.lakes().length);
    });
  }

  // Add a lake immutably
  addLake(newLake: Lake) {
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

  // Random UUID for lakes added in the app, so they can never clash with API ids
  newId(): string {
    return crypto.randomUUID();
  }

  // Remove a lake immutably
  removeLake(name: string) {
    this.lakeData.update((list) => list.filter((lake) => lake.name !== name));
  }

  private config = inject(APP_CONFIG);

  apiBaseUrl = this.config.apiBaseUrl;
}
