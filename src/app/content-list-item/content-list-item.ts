import { Component, input } from '@angular/core';
import {Lake} from '../shared/models/lake';

@Component({
  imports: [],
  selector: 'app-content-list-item',
  styleUrl: './content-list-item.css',
  templateUrl: './content-list-item.html',
})
export class ContentListItem {

  lake = input.required<Lake>()


}
