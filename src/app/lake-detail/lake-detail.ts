import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lake } from '../shared/models/lake';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { SpeedPipe } from '../pipes/speed-pipe';
import { WaterQualityLabelPipe } from '../pipes/water-quality-label-pipe';
@Component({
  imports: [RouterLink, DecimalPipe, TitleCasePipe, SpeedPipe, WaterQualityLabelPipe],
  selector: 'app-lake-detail',
  styleUrl: './lake-detail.css',
  templateUrl: './lake-detail.html',
})
export class LakeDetail {
  // Both arrive through withComponentInputBinding():
  // id from the :id route param, lake from lakeResolver (null if no such lake)
  id = input.required<string>();
  lake = input<Lake | null>(null);
}
