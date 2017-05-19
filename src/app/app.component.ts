import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.playlist_data.length > 0) {
      this.selectPlaylist(0); // Select first one
    }
  }

  selectPlaylist(index: number): void {
    this.items = this.playlist_data[index].items;
  }

  onItemChange(selectedItem: { value: string }): void {
    this.router.navigate(['/playlist', selectedItem.value])
  }

  onMenuClick(index: number): void {
    this.items = this.playlist_data[index].items;
  }

}
