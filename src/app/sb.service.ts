import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'; // for operators
import { Video } from './video';


@Injectable()
export class SbService {
  private sbServerUrl = 'sb';

  constructor(private http: Http) { }

  getPlaylistItemsDetails(playlistId: string): Observable<Video[]> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.sbServerUrl + '/playlistItemsDetails', JSON.stringify({playlistId: playlistId}), options)
        .map(res => this.createVideoFromJson(res.json()));
  }

  createVideoFromJson(json: any): Video[] {
    let arr = json.list;
    let ret: Video[] = [];
    if (arr && arr.length > 0) {
      arr.forEach(function(obj){
        ret.push(new Video(obj));
      });
    }
    return ret;
  }

}
