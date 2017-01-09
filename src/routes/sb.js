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

router.get('/test', function(req, res, next){
  // youTube.getById('0E00Zuayv9Q', function(error, result){
  //   // https://www.youtube.com/watch?v=0E00Zuayv9Q
  //   if(error){
  //     logError(error);
  //     res.send(error);
  //   }else{
  //     res.send(result);
  //   }
  // });
});

router.get('/test2', function(req, res, next){
  var params = {
    part: 'id,snippet',
    channelId: '',
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

router.get('/playlistItems', function(req, res, next){
  var params = {
    part: 'id,snippet',
    playlistId: '',
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

/*** POST ***/


module.exports = router;
