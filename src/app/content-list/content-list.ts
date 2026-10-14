import { Component, inject } from '@angular/core';
import { LakeService } from '../services/lake';
import { ContentListItem } from '../content-list-item/content-list-item';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [ContentListItem],
  templateUrl: './content-list.html',
  styleUrl: './content-list.css',
})
export class ContentList {
  private lakeService = inject(LakeService);

  lakes = this.lakeService.lakes;
  safeLakes = this.lakeService.safeLakes;
  safeLakeCount = this.lakeService.safeLakeCount;

  removeLake(name: string) {
    this.lakeService.removeLake(name);
  }
  apiBaseUrl = this.lakeService.apiBaseUrl;
}
