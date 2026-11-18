import { Component, computed, inject, input } from '@angular/core';
import { Lake } from '../shared/models/lake';
import { LakeService } from '../services/lake';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-lake-detail',
  styleUrl: './lake-detail.css',
  templateUrl: './lake-detail.html',
})
export class LakeDetail {
  id = input.required<string>();
  private lakeServices = inject(LakeService);
  lake = computed(() => this.lakeServices.lakes().find((lake) => lake.id === this.id()));
}
