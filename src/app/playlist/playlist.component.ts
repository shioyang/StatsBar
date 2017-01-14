import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import * as d3 from 'd3-selection';

import { SbService } from '../sb.service';
import { Video } from '../video';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  videos: Video[];
  svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  constructor(
    private sbService: SbService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.sbService.getPlaylistItemsDetails(params['playlistId']))
      .subscribe((videos: Video[]) => {
        this.videos = videos;
        this.initSvg();
      });
  }

  initSvg(): void {
    // after videos are loaded
    this.svg = d3.select('svg');
  }

}
