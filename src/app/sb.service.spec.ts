/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SbService } from './sb.service';

describe('SbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SbService]
    });
  });

  it('should ...', inject([SbService], (service: SbService) => {
    expect(service).toBeTruthy();
  }));
});
