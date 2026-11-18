import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'waterQualityLabel',
})
export class WaterQualityLabelPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return 'Unknown';
    }
    if (value <= 300) {
      return 'Safe to swim';
    }
    if (value >= 500) {
      return 'Do not swim';
    }
    return 'Check conditions';
  }
}

