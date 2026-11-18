import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { Lake } from '../shared/models/lake';
import { LakeService } from '../services/lake';

// Waits for the API data before the route activates, then hands the matching lake
// to the component (as the `lake` input, thanks to withComponentInputBinding()).
// Resolves to null if there's no lake with that id, so the page can say "not found".
export const lakeResolver: ResolveFn<Lake | null> = (route) => {
  const lakeService = inject(LakeService);
  const id = route.paramMap.get('id') ?? '';

  return lakeService.whenLoaded().pipe(map(() => lakeService.getLakeById(id) ?? null));
};
