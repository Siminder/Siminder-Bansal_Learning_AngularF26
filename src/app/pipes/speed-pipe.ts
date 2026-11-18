import { Pipe, PipeTransform } from '@angular/core';

export type SpeedUnit = 'kmh' | 'mph' | 'knots';


@Pipe({
  name: 'speed',
})
export class SpeedPipe implements PipeTransform {
  transform(kmh: number | null | undefined, unit: SpeedUnit = 'kmh'): string {
    if (kmh === null || kmh === undefined || Number.isNaN(kmh)) {
      return 'Not available';
    }

    switch (unit) {
      case 'mph':
        return `${(kmh * 0.621371).toFixed(1)} mph`;
      case 'knots':
        return `${(kmh * 0.539957).toFixed(1)} knots`;
      default:
        return `${kmh.toFixed(1)} km/h`;
    }
  }
}
