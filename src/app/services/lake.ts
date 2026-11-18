import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, ReplaySubject, take } from 'rxjs';
import { Lake } from '../shared/models/lake';
import { APP_CONFIG } from '../shared/app-config';
import { LAKE_LOCATIONS } from './lake-locations';
import { ForecastItem, isForecastItem, MarineItem, toArray, waveHeightOf } from './open-meteo';

// One local change. Adds, edits and deletes are saved as a list of these in
// localStorage and replayed on top of the API data, so they survive a refresh.
export type LakeChange =
  | { type: 'add'; lake: Lake }
  | { type: 'update'; lake: Lake }
  | { type: 'delete'; id: string };

const CHANGES_STORAGE_KEY = 'lake-app.local-changes';

@Injectable({
  providedIn: 'root',
})
export class LakeService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  apiBaseUrl = this.config.apiBaseUrl;

  // Writable signal holding the lakes exactly as they came from the API
  private lakeData = signal<Lake[]>([]);

  // Local adds/edits/deletes, loaded from localStorage on start-up
  private changes = signal<LakeChange[]>(readStoredChanges());

  // What components see: API data with the local changes applied on top
  lakes = computed(() => applyChanges(this.lakeData(), this.changes()));

  // Signals, because the app is zoneless: values set inside subscribe must be signals
  isLoading = signal(false);
  error = signal<string | null>(null);

  // First computed: filter lakes using your water-quality rule
  safeLakes = computed(() => this.lakes().filter((lake) => lake.waterQuality <= 300));

  // Second computed: derive the count from the first computed
  safeLakeCount = computed(() => this.safeLakes().length);

  // Emits once each load attempt finishes (success or error); used by the resolver
  private loaded = new ReplaySubject<void>(1);

  constructor() {
    // Save the change list whenever it changes
    effect(() => {
      const changes = this.changes();
      try {
        localStorage.setItem(CHANGES_STORAGE_KEY, JSON.stringify(changes));
      } catch {
        // Storage can be blocked (private window); changes then last until refresh
      }
    });

    this.load();
  }

  load(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.fetchLakes().subscribe({
      next: (lakes) => this.lakeData.set(lakes),
      error: () => {
        this.error.set('Could not load live lake conditions from Open-Meteo.');
        this.isLoading.set(false);
        this.loaded.next();
      },
      complete: () => {
        this.isLoading.set(false);
        this.loaded.next();
      },
    });
  }

  // Completes once the data has loaded (or failed to), so a resolver can wait for it
  whenLoaded(): Observable<void> {
    return this.loaded.pipe(take(1));
  }

  // One request to each Open-Meteo API for all lakes at once, merged into Lake objects
  private fetchLakes(): Observable<Lake[]> {
    const coordinates = {
      latitude: LAKE_LOCATIONS.map((lake) => lake.latitude).join(','),
      longitude: LAKE_LOCATIONS.map((lake) => lake.longitude).join(','),
    };

    const forecast$ = this.http.get<ForecastItem | ForecastItem[]>(
      `${this.config.apiBaseUrl}/forecast`,
      { params: { ...coordinates, current: 'temperature_2m,wind_speed_10m' } },
    );
    const marine$ = this.http.get<MarineItem | MarineItem[]>(
      `${this.config.marineApiBaseUrl}/marine`,
      { params: { ...coordinates, current: 'wave_height' } },
    );

    return forkJoin([forecast$, marine$]).pipe(
      // Unwrap each item's `current` object and pair it with its local lake (same order)
      map(([forecastResponse, marineResponse]) => {
        const forecast = toArray(forecastResponse);
        const marine = toArray(marineResponse);

        return LAKE_LOCATIONS.flatMap((location, i): Lake[] => {
          const conditions = forecast[i];
          if (!isForecastItem(conditions)) {
            return []; // drop malformed items
          }
          return [
            {
              id: location.id,
              name: location.name,
              airTemperature: conditions.current.temperature_2m,
              windSpeed: conditions.current.wind_speed_10m,
              waveHeight: waveHeightOf(marine[i]),
              waterQuality: location.waterQuality,
              activities: location.activities,
            },
          ];
        });
      }),
    );
  }

  // Find one lake by its id
  getLakeById(id: string): Lake | undefined {
    return this.lakes().find((lake) => lake.id === id);
  }

  // Local only: nothing is sent to the API
  addLake(newLake: Lake): void {
    this.changes.update((list) => [...list, { type: 'add', lake: newLake }]);
  }

  // Replace the lake with the same id (no duplicate is created)
  updateLake(updated: Lake): void {
    this.changes.update((list) => [...list, { type: 'update', lake: updated }]);
  }

  removeLake(id: string): void {
    this.changes.update((list) => [...list, { type: 'delete', id }]);
  }

  // Random UUID for lakes added in the app, so they can never clash with API ids
  newId(): string {
    return crypto.randomUUID();
  }
}

// Replay the change list over the API data, oldest change first
function applyChanges(apiLakes: Lake[], changes: LakeChange[]): Lake[] {
  return changes.reduce((lakes, change) => {
    switch (change.type) {
      case 'add':
        return [...lakes, change.lake];
      case 'update':
        return lakes.map((lake) => (lake.id === change.lake.id ? change.lake : lake));
      case 'delete':
        return lakes.filter((lake) => lake.id !== change.id);
    }
  }, apiLakes);
}

function readStoredChanges(): LakeChange[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(CHANGES_STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed)
      ? parsed.filter((change) => ['add', 'update', 'delete'].includes(change?.type))
      : [];
  } catch {
    return [];
  }
}
