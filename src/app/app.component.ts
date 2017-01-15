import { Component, OnInit } from '@angular/core';
import { PLAYLIST_DATA } from './playlist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stats Bar';
  playlist_data: { name: string, playlistId: string }[] = PLAYLIST_DATA;

  constructor() { }

  ngOnInit() {
  }

}
