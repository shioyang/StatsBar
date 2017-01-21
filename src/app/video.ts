export class Video {
  id: string;
  etag: string;
  kind: string;
  snippet: any;
  statistics: any;
// commentCount
// dislikeCount
// favoriteCount <<- ???
// likeCount
// viewCount

  constructor(json: any) {
    let arr = ['id', 'etag', 'kind', 'snippet', 'statistics'];
    arr.forEach(val => {
      if (json[val]) {
        this[val] = json[val];
      }
    }, this);
  }
}
