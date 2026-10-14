import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Lake } from './shared/models/lake';
import { ContentList } from './content-list/content-list';

@Component({
  imports: [RouterOutlet, ContentList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

}
