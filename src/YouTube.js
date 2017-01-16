var request = require('request');
var queryString = require('querystring');

var youtubeUrl = 'https://www.googleapis.com/youtube/v3/';
var youTubeAPIKey = process.env.YOUTUBE_APIKEY;

var YouTube = function(){
    /*** APIs ***/
    this.search = function(/* Object? */params, callback){
        this.requestAction('search', params, callback);
    };

    this.playlistItems = function(/* Object? */params, callback){
        this.requestAction('playlistItems', params, callback);
    };

    this.videos = function(/* Object? */params, callback){
        this.requestAction('videos', params, callback);
    };

    /*** Utils ***/
    this.requestAction = function(action, params, callback){
        var url = this.genUrl(action, params);
        request(url, callback);
    };

    this.genUrl = function(action, params){
        var paramsWithKey = params || {};
        paramsWithKey.key = youTubeAPIKey;
        return youtubeUrl + action + '?' + queryString.stringify(paramsWithKey);
    };
};

module.exports = YouTube;
