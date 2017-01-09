var express = require('express');
var router = express.Router();

var YouTube = require('../YouTube');
var youTube = new YouTube();

// var youTubeAPIKey = process.env.YOUTUBE_APIKEY;
// youTube.setKey(youTubeAPIKey);

/*** Utils ***/
var logError = function(err){ console.log(err); }

/*** REST ***/
/* GET */
/*
 * Response
 *   API list
 */
router.get('/', function(req, res, next){
  res.render('api_list', { title: 'SB API List' });
  //TODO
});

/* POST */
/*
 * Request params
 *   channelId: string;
 * Response
 *   result body of YouTube Data API
 */
router.post('/channelItems', function(req, res){
  let channelId = req.body.channelId;
  let params = {
    part: 'id,snippet',
    channelId: channelId,
    order: 'date',
    maxResults: 50 // 0 to 50, default 5
  };
  youTube.search(params, function(error, result){
    if(error){
      logError(error);
      res.send(error);
    }else{
      res.send(result.body);
    }
  });
});

/*
 * Request params
 *   playlistId: string;
 * Response
 *   result body of YouTube Data API
 */
router.post('/playlistItems', function(req, res){
  let playlistId = req.body.playlistId;
  let params = {
    part: 'id,snippet',
    playlistId: playlistId,
    maxResults: 50 // 0 to 50, default 5
  };
  youTube.playlistItems(params, function(error, result){
    if(error){
      logError(error);
      res.send(error);
    }else{
      res.send(result.body);
    }
  });
});

/*
 * Request params
 *   playlistId: string;
 * Response
 *   Array of playlist items' details
 */
router.post('/playlistItemsDetails', function(req, res){
  let playlistId = req.body.playlistId;
  let params = {
    part: 'id,snippet',
    playlistId: playlistId,
    maxResults: 50 // 0 to 50, default 5
  };
  youTube.playlistItems(params, function(error, result){
    if(error){
      logError(error);
      res.send(error);
    }else{
      var videos = result.body.items || [];
      var videoIds = [];

      videos.forEach(function(v) {
        var videoId = v.snippet.resourceId.videoId;
        if(v.snippet && v.snippet.resourceId && v.snippet.resourceId.videoId){
          videoIds.push(v.snippet.resourceId.videoId);
        }
      });

      if(videoIds.length > 0){
        var params = {
          part: 'id,snippet,statistics',
          id: videoIds
        };
        youTube.videos(params, function(error, result){
          if(error){
            logError(error);
            res.send(error);
          }else{
            res.send(result.body.items || []);
          }
        });
      }
    }
  });
});

module.exports = router;
