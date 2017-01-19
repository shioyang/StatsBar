import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'; // for operators
import { Video } from './video';


@Injectable()
export class SbService {
  private sbServerUrl = 'sb';

  constructor(private http: Http) { }

  getPlaylistItemsDetails(playlistId: string): Observable<Video[]> {
    let searchParams = new URLSearchParams();
    searchParams.set('playlistId', playlistId);
    return this.http.get(this.sbServerUrl + '/playlistItemsDetails', { search: searchParams })
        .map(res => this.createVideoFromJson(res.json()));
  }

  private createVideoFromJson(json: any): Video[] {
    let arr = json;
    let ret: Video[] = [];
    if (arr && arr.length > 0) {
      arr.forEach(function(obj){
        ret.push(new Video(obj));
      });
    }
    return ret;
  }

}
