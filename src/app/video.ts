export class Video {
  id: string;
  etag: string;
  kind: string;
  snippet: {
    categoryId: string,
    channelId: string,
    channelTitle: string,
    description: string,
    liveBroadcastContent: string,
    localized: { title: string, description: string },
    publishedAt: string,
    tags: string[],
    thumbnails: {
      default: { url: string, width: string, height: string },
      high: { url: string, width: string, height: string },
      maxres: { url: string, width: string, height: string },
      medium: { url: string, width: string, height: string },
      standard: { url: string, width: string, height: string }
    },
    title: string
  };
  statistics: {
    commentCount: string,
    dislikeCount: string,
    favoriteCount: string, // <<- ???
    likeCount: string,
    viewCount: string
  };

  constructor(json: any) {
    let arr = ['id', 'etag', 'kind', 'snippet', 'statistics'];
    arr.forEach(val => {
      if (json[val]) {
        this[val] = json[val];
      }
    }, this);
  }
}
