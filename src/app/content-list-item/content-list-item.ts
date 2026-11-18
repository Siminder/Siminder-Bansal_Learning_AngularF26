import { Component, input, output } from '@angular/core';
import { Lake } from '../shared/models/lake';
import { RouterLink } from '@angular/router';
import { DecimalPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { WaterQualityLabelPipe } from '../pipes/water-quality-label-pipe';
import { SpeedPipe } from '../pipes/speed-pipe';
@Component({
  selector: 'app-content-list-item',
  standalone: true,
  templateUrl: './content-list-item.html',
  styleUrl: './content-list-item.css',
  imports: [RouterLink, DecimalPipe, TitleCasePipe, WaterQualityLabelPipe, SpeedPipe, SlicePipe],
})
export class ContentListItem {
  lake = input.required<Lake>();

  remove = output<string>();

  removeLake(): void {
    this.remove.emit(this.lake().id);
  }
}
