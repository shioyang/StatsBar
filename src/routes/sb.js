var express = require('express');
var router = express.Router();
var mcache = require('memory-cache');

var YouTube = require('./YouTube');
var youTube = new YouTube();

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
      var data = JSON.parse(result.body);
      var videos = data.items || [];
      var videoIds = [];

      videos.forEach(function(v) {
        if(v.snippet && v.snippet.resourceId && v.snippet.resourceId.videoId){
          videoIds.push(v.snippet.resourceId.videoId);
        }
      });

      if(videoIds.length > 0){
        var params = {
          part: 'id,snippet,statistics',
          id: videoIds.join(',')
        };
        youTube.videos(params, function(error, result){
          if(error){
            logError(error);
            res.send(error);
          }else{
            var data = JSON.parse(result.body);
            res.header({ 'Cache-Control': 'public, max-age=86400' }); // 1 day: 86400 = 24 * 60 * 60
            res.send(data.items || []);
          }
        });
      }else{
        console.log("No videos.");
        res.send([]);
      }
    }
  });
});

/*
 * Request params
 *   videoId: string;
 * Response
 *   result body of YouTube Data API
 */
router.post('/commentThreads', function(req, res){
  let videoId = req.body.videoId;
  let params = {
    part: 'id,replies,snippet',
    videoId: videoId,
    maxResults: 100 // 1 to 100, default 20
  };
  youTube.commentThreads(params, function(error, result){
    if(error){
      logError(error);
      res.send(error);
    }else{
      res.send(result.body);
    }
  });
});

module.exports = router;
