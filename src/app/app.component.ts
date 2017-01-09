import { Component, OnInit } from '@angular/core';
import { SbService } from './sb.service';

import * as d3 from 'd3-selection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  data = null;
  svg;

  constructor(private sbService: SbService) {}

  ngOnInit() {
    let t = this;
    this.retrieveData(function(){
      t.initSvg();
    });
  }

  retrieveData(callback: any): void {
    // TODO: this.sbService.
    if (callback) {
      callback();
    }
  }

  initSvg(): void {
    this.svg = d3.select('svg');
  }
}
