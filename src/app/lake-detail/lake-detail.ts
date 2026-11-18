import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Lake } from '../shared/models/lake';
import { LakeService } from '../services/lake';
import { SpeedPipe } from '../pipes/speed-pipe';
import { WaterQualityLabelPipe } from '../pipes/water-quality-label-pipe';

@Component({
  imports: [RouterLink, DecimalPipe, TitleCasePipe, SpeedPipe, WaterQualityLabelPipe],
  selector: 'app-lake-detail',
  styleUrl: './lake-detail.css',
  templateUrl: './lake-detail.html',
})
export class LakeDetail implements OnInit, OnDestroy {
  // Both arrive through withComponentInputBinding():
  // id from the :id route param, lake from lakeResolver (null if no such lake)
  id = input.required<string>();
  lake = input<Lake | null>(null);

  private lakeService = inject(LakeService);
  private openedAt = 0;
  private lakeName = '';

  // constructor() {
  //  console.log('[lifecycle] id in constructor:', this.id());
  // }

  ngOnInit(): void {
    // Inputs are set by the time ngOnInit runs, so this.id() works here
    const lake = this.lakeService.getLakeById(this.id());
    // Remember the name now, so ngOnDestroy can still log it even if the lake is deleted
    this.lakeName = lake?.name ?? `unknown lake (${this.id()})`;
    this.openedAt = Date.now();
    console.log(`[lifecycle] opened: ${this.lakeName}`);
  }

  ngOnDestroy(): void {
    const seconds = Math.round((Date.now() - this.openedAt) / 1000);
    console.log(`[lifecycle] closed: ${this.lakeName} after ${seconds} seconds`);
  }
}
