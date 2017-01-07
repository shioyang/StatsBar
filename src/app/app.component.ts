import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  svg;

  ngOnInit() {
    this.initSvg();
  }

  initSvg() {
    this.svg = d3.select('svg');
  }
}
