# Stats Bar

It retrieves statistics data from YouTube, and visualizes them.

## Prepare

Modify playlists data in src/app/playlist.ts.

```TypeScript
PLAYLIST_DATA: {
  name: string,
  // required channelId or items
  channelId: string, // not implemented
  items: { name: string, playlistId: string }[]
}[]
```

It uses YouTube API. Add YOUTUBE_APIKEY to your environment variables.

## Install & build

$ yarn install

## Execute

$ npm start

Access http://localhost:3000/
