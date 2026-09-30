import { Component } from '@angular/core';
import {Lake} from '../shared/models/lake';
import {ContentListItem} from '../content-list-item/content-list-item';

@Component({
  imports: [
    ContentListItem
  ],
  selector: 'app-content-list',
  styleUrl: './content-list.css',
  templateUrl: './content-list.html',
})
export class ContentList {
  lakeList: Lake[] = [
    {
      name: "Lake Ontario",
      waterTemperature: 10,
      waveHeight: 20,
      windSpeed: 13,
      waterQuality: 250 },

    {
      name: "Lake Huron",
      waterTemperature: 30,
      waveHeight: 25,
      windSpeed: 50,
      waterQuality: 500  },

    {
      name: "Lake Erie",
      waterTemperature: -100,
      waveHeight: 20,
      windSpeed: 13,
      waterQuality: 500 },

    {
      name: "Lake Simco",
      waterTemperature: -100,
      waveHeight: 20,
      windSpeed: 13,
      waterQuality: 320 },

    {
      name: "Lake Musoka",
      waterTemperature: -100,
      waveHeight: 20,
      windSpeed: 13,
      waterQuality: 100 },

    {
      name: "Paradise Lake",
      waterTemperature: -100,
      waveHeight: 20,
      windSpeed: 13,
      waterQuality: 600 },

  ];

  handleAction(event: { id: string; action: string }) {
    console.log(event);
  }
}
