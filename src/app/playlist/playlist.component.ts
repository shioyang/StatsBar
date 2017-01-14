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
  svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  constructor(
    private sbService: SbService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.sbService.getPlaylistItemsDetails(params['playlistId']))
      .subscribe((videos: Video[]) => {
        this.initSvg();
        this.showVideos(videos);
      });
  }

  initSvg(): void {
    let svgArea: d3.Selection<d3.BaseType, {}, HTMLElement, any>
          = d3.select('.SbSvgArea');
    this.svg = d3.select('.SbSvg');
    if (this.svg.node()) {
      this.svg.remove();
    }
    this.svg = svgArea.append('svg')
                        .classed('SbSvg', true)
                        .attr('width', 400)
                        .attr('height', 400);
  }

  showVideos(videos: Video[]): void {
    this.svg.selectAll('text').data(videos).enter()
      .append('text')
        .attr('font-size', '12px')
        .attr('fill', 'black')
        .attr('y', (d, i) => (14 * (i + 1)))
        .text(d => d.snippet.title);
  }

}
