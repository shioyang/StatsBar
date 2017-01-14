import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
// import * as d3 from 'd3-selection';
import * as d3 from 'd3';

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
        this.showVideos(videos, 'viewCount');
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
                        .attr('width', 400 + 40)
                        .attr('height', 400 + 40)
                      .append('g')
                        .attr('transform', 'translate(' + 20 + ',' + 20 + ')');
  }

  showVideos(videos: Video[], stat: string): void {
    let x = d3.scaleBand()
              .range([0, 400])
              .padding(0.2);
    let y = d3.scaleLinear()
              .range([400, 0]);

    x.domain(videos.map(d => d.snippet.title));
    y.domain([0, d3.max(videos, d => d.statistics.viewCount - 0)]);

    let sss = d3.max(videos, d => d.statistics.viewCount);

    this.svg.selectAll('.bar').data(videos)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', d => x(d.snippet.title))
          .attr('width', x.bandwidth())
          .attr('y', d => y(d.statistics.viewCount))
          .attr('height', d => 400 - y(d.statistics.viewCount));

    this.svg.append('g')
            .attr('transform', 'translate(0, ' + 400 + ')')
            .call(d3.axisBottom(x));
    this.svg.append('g')
            .call(d3.axisLeft(y));

    // this.svg.selectAll('text').data(videos).enter()
    //   .append('text')
    //     .attr('font-size', '12px')
    //     .attr('fill', 'black')
    //     .attr('y', (d, i) => (14 * (i + 1)))
    //     .text(d => d.snippet.title + ' view:' + d.statistics.viewCount);
  }

}
