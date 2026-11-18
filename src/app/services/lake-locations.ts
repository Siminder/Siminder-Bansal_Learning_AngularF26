// Open-Meteo works by coordinates and doesn't know lake names, water quality or
// activities, so those live here. The coordinates are sent to the API as params,
// and the API's live conditions are merged in for each lake.
export interface LakeLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  waterQuality: number;
  activities: string[];
}

export const LAKE_LOCATIONS: LakeLocation[] = [
  {
    id: 'lake-huron',
    name: 'Lake Huron',
    latitude: 44.8,
    longitude: -82.4,
    waterQuality: 500,
    activities: ['Swimming', 'Sailing'],
  },
  {
    id: 'lake-erie',
    name: 'Lake Erie',
    latitude: 41.8,
    longitude: -81.5,
    waterQuality: 500,
    activities: ['Fishing'],
  },
  {
    id: 'lake-ontario',
    name: 'Lake Ontario',
    latitude: 43.6,
    longitude: -77.8,
    waterQuality: 250,
    activities: ['Kayaking', 'Fishing'],
  },
  {
    id: 'lake-simcoe',
    name: 'Lake Simcoe',
    latitude: 44.4,
    longitude: -79.4,
    waterQuality: 320,
    activities: ['Ice fishing'],
  },
];
