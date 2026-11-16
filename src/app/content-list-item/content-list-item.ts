import { Component, input, output } from '@angular/core';
import { Lake } from '../shared/models/lake';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-content-list-item',
  standalone: true,
  templateUrl: './content-list-item.html',
  styleUrl: './content-list-item.css',
  imports: [RouterLink],
})
export class ContentListItem {
  lake = input.required<Lake>();

  remove = output<string>();

  removeLake(): void {
    this.remove.emit(this.lake().name);
  }
}
