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
const VIDEO_BASE_URL = 'https://www.youtube.com/watch?v=';

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
      videos.sort((a, b) => (this.calcStatValue(b) - this.calcStatValue(a)));
    } else {
      videos = this.videos;
    }

    let x_min = (this.stat === 'likeRatio') ?
                  d3.min(videos, d => this.calcStatValue(d)) : 0;
    let x_max = d3.max(videos, d => this.calcStatValue(d));
    x.domain([x_min, x_max]);
    y.domain(videos.map( d => d.snippet.title));

    this.svg.selectAll('.SbBar').data(videos)
        .enter().append('rect')
          .attr('class', 'SbBar')
          .attr('x', d => (WIDTH + WIDTH_MARGIN))
          .attr('width', 0)
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
          })
          .transition().duration(1000)
            .attr('x', d => x(this.calcStatValue(d)))
            .attr('width', d => (WIDTH + WIDTH_MARGIN) - x(this.calcStatValue(d)));

    this.svg.append('g')
            .classed('SbXAxis', true)
            .attr('transform', this.genTranslateString(WIDTH_MARGIN.toString(), HEIGHT.toString()))
            .call(d3.axisBottom(x));
    this.svg.append('g')
            .classed('SbYAxis', true)
            .attr('transform', this.genTranslateString((WIDTH + WIDTH_MARGIN).toString(), '0'))
            .call(d3.axisRight(y));
                    // .tickFormat( d3.format('.1') ));

    d3.selectAll('.SbYAxis').selectAll('.tick')
      .insert('image')
        .classed('SbThumbnail', true)
        .attr('xlink:href', function(d, i) { return videos[i].snippet.thumbnails.medium.url; })
        .attr('width', function(d, i) { return videos[i].snippet.thumbnails.medium.width; })
        .attr('height', function(d, i) { return videos[i].snippet.thumbnails.medium.height; })
        .attr('transform', this.genTranslateString('20', '15'));

    d3.selectAll('.SbYAxis').selectAll('.tick')
      .on('click', function(d, i) {
        window.open(VIDEO_BASE_URL + videos[i].id, '_blank');
      })
      .on('mouseover', function(d, i) {
        d3.select(this).select('image')
          .classed('SbActive', true);
        d3.selectAll('.SbYAxis .tick')
          .classed('SbTickHidden', function(da) { return da !== videos[i].snippet.title; });
      })
      .on('mouseout', function(d, i) {
        d3.select(this).select('image')
          .classed('SbActive', false);
        d3.selectAll('.SbYAxis .tick')
          .classed('SbTickHidden', false);
      });
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

  private calcStatValue(v: Video): number {
    let ret = v.statistics[this.stat];
    if (ret !== undefined) {
      return ret - 0;
    }

    let like = +v.statistics.likeCount;
    let dislike = +v.statistics.dislikeCount;
    let view = +v.statistics.viewCount;
    switch (this.stat) {
      case 'likeRatio':
            ret = like / (like + dislike);
            break;
      case 'likeViewRatio':
            ret = like / view;
            break;
      case 'dislikeViewRatio':
            ret = dislike / view;
            break;
      default:
            console.log('Unknown stat: ' + this.stat);
    }
    return ret;
  }

  private genTranslateString(x: string, y: string): string {
    return 'translate(' + x + ', ' + y + ')';
  }

}
