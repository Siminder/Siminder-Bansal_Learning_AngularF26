import { Injectable, signal, computed, effect } from '@angular/core';
import { Lake } from '../shared/models/lake';

@Injectable({
  providedIn: 'root',
})
export class LakeService {
  // Private signal holding the lake data
  private lakeData = signal<Lake[]>([
    {
      name: 'Lake Ontario',
      waterTemperature: 18,
      waveHeight: 0.5,
      windSpeed: 15,
      waterQuality: 250,
    },
    {
      name: 'Lake Huron',
      waterTemperature: 16,
      waveHeight: 0.8,
      windSpeed: 20,
      waterQuality: 500,
    },
    {
      name: 'Lake Erie',
      waterTemperature: 20,
      waveHeight: 0.3,
      windSpeed: 10,
      waterQuality: 500,
    },
    {
      name: 'Lake Simcoe',
      waterTemperature: 17,
      waveHeight: null,
      windSpeed: 12,
      waterQuality: 320,
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

  // Remove a lake immutably
  removeLake(name: string) {
    this.lakeData.update((list) => list.filter((lake) => lake.name !== name));
  }
}
