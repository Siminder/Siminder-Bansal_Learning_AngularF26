export interface Lake {
    id: number;
    name: string;
    waterTemperature: number;
    waveHeight: number | null;
    windSpeed: number;
    waterQuality: number;
    activities?: string[]; // e.g. swimming, fishing, kayaking
}
