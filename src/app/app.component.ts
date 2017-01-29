import { Component, OnInit } from '@angular/core';
import { PLAYLIST_DATA } from './playlist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stats Bar';
  playlist_data = PLAYLIST_DATA;
  items: { name: string, playlistId: string }[] = null;

  constructor() { }

  ngOnInit() {
  }

  onMenuClick(index: number): void {
    this.items = this.playlist_data[index].items;
  }

}
