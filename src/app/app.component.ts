import { Component, OnInit } from '@angular/core';
import { SbService } from './sb.service';
import * as d3 from 'd3-selection';
import { Video } from './video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  videos = null;
  svg;

  constructor(private sbService: SbService) {}

  ngOnInit() {
    let t = this;
    this.retrieveData(() => this.initSvg());
  }

  retrieveData(callback: any): void {
    let todo_playlistId = '';
    let t = this;
    this.sbService.getPlaylistItemsDetails(todo_playlistId)
      .subscribe(function(videos: Video[]){
        t.videos = videos;
        if (callback) { callback(); }
      });
  }

  initSvg(): void {
    // after videos are loaded
    this.svg = d3.select('svg');
  }
}
