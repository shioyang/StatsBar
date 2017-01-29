export const PLAYLIST_DATA: {
  name: string,
  // required channelId or items
  channelId: string, // not implemented
  items: { name: string, playlistId: string }[]
}[] = [
  {
    name: 'Kouhaku 2016',
    channelId: null,
    items: [
      { name: 'Team-RED', playlistId: 'PLQntWbrycbJfKkLkU25hEpUsOordsQ3pr' },
      { name: 'Team-WHITE', playlistId: 'PLQntWbrycbJdnjZxetU31jRKsAR-mugw3' }
    ]
  }
];
