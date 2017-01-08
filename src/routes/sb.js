var express = require('express');
var router = express.Router();

var YouTube = require('youtube-node');
var youTube = new YouTube();

var youTubeAPIKey = process.env.YOUTUBE_API_KEY;
youTube.setKey(youTubeAPIKey);

/*** Utils ***/
var logError = function(err) { console.log(err); }

/*** REST ***/
/* GET */
/*
 * Response
 *   API list
 */
router.get('/', function(req, res, next) {
  res.render('api_list', { title: 'SB API List' });
  //TODO
});

module.exports = router;
