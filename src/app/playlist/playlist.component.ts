import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
// import * as d3 from 'd3-selection';
import * as d3 from 'd3';

import { SbService } from '../sb.service';
import { Video } from '../video';

const WIDTH = 600;
const HEIGHT = 800;
const WIDTH_MARGIN = 20;
const HEIGHT_MARGIN = 20;
const WIDTH_FOR_TICK = 400;

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  videos: Video[] = null;
  stat: string = 'viewCount';
  sorting: boolean = false;

  constructor(
    private sbService: SbService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.sbService.getPlaylistItemsDetails(params['playlistId']))
      .subscribe((videos: Video[]) => {
        this.initSvg();
        this.videos = videos;
        this.showVideos();
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
                        .attr('width', WIDTH + WIDTH_FOR_TICK + WIDTH_MARGIN * 2)
                        .attr('height', HEIGHT + HEIGHT_MARGIN * 2)
                      .append('g')
                        .attr('transform', 'translate(' + WIDTH_MARGIN + ',' + HEIGHT_MARGIN + ')');
  }

  showVideos(): void {
    let videos: Video[] = null;
    let stat: string = this.stat;
    let x = d3.scaleLinear()
              .range([WIDTH, 0]);
    let y = d3.scaleBand()
              .range([0, HEIGHT])
              .padding(0.2);

    if (this.sorting) {
      videos = this.videos.concat(); // Keep original ordered array
      videos.sort((a, b) => (b.statistics[stat] - a.statistics[stat]));
    } else {
      videos = this.videos;
    }

    x.domain([0, d3.max(videos, d => d.statistics[stat] - 0)]);
    y.domain(videos.map(d => d.snippet.title));

    this.svg.selectAll('.SbBar').data(videos)
        .enter().append('rect')
          .attr('class', 'SbBar')
          .attr('x', d => x(d.statistics[stat]))
          .attr('width', d => (WIDTH + WIDTH_MARGIN) - x(d.statistics[stat]))
          .attr('y', d => y(d.snippet.title))
          .attr('height', y.bandwidth())
          .attr('fill', 'skyblue')
          .attr('opacity', .8)
          .on('mouseover', function(d) {
            d3.select(this)
              .attr('fill', 'dodgerblue');
          })
          .on('mouseout', function(d) {
            d3.select(this)
              .attr('fill', 'skyblue');
          });

    this.svg.append('g')
            .attr('transform', this.genTranslateString(WIDTH_MARGIN.toString(), HEIGHT.toString()))
            .call(d3.axisBottom(x));
    this.svg.append('g')
            .attr('transform', this.genTranslateString((WIDTH + WIDTH_MARGIN).toString(), '0'))
            .call(d3.axisRight(y));
                    // .tickFormat( d3.format('.1') ));

    // this.svg.selectAll('text').data(videos).enter()
    //   .append('text')
    //     .attr('font-size', '12px')
    //     .attr('fill', 'black')
    //     .attr('y', (d, i) => (14 * (i + 1)))
    //     .text(d => d.snippet.title + ' view:' + d.statistics[stat]);
  }

  onClick(stat: string): void {
    this.stat = stat;
    this.updateVideosArea();
  }

  onCheckboxChange(): void {
    this.updateVideosArea();
  }

  private updateVideosArea(): void {
    if (this.videos && this.videos.length >= 0) {
      this.initSvg();
      this.showVideos();
    }
  }

  private genTranslateString(x: string, y: string): string {
    return 'translate(' + x + ', ' + y + ')';
  }

}
