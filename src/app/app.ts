import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Lake } from './shared/models/lake';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
    lakeList: Lake[] = [
      {name: "Lake Ontario", waterTemperature: 10, waveHeight: 20, windSpeed: 13, waterQuality: 250 },
      {name: "Lake Huron", waterTemperature: 30, waveHeight: 25, windSpeed: 50, waterQuality: 500  },
      {name: "Lake Erie", waterTemperature: -100, waveHeight: 20, windSpeed: 13, waterQuality: 500 },
      {name: "Lake Simco", waterTemperature: -100, waveHeight: 20, windSpeed: 13, waterQuality: 320 },
      {name: "Lake Musoka", waterTemperature: -100, waveHeight: 20, windSpeed: 13, waterQuality: 100 },
      {name: "Paradise Lake", waterTemperature: -100, waveHeight: 20, windSpeed: 13, waterQuality: 600 },

    ]
}
