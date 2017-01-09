var request = require('request');
var queryString = require('querystring');

var youtubeUrl = 'https://www.googleapis.com/youtube/v3/';
var youTubeAPIKey = process.env.YOUTUBE_APIKEY;

var YouTube = function(){
    this.search = function(/* Object? */params, callback){
        var url = this.genUrl('search', params);
        console.log('url:' + url);
        request(url, callback);
    };

    this.genUrl = function(action, params){
        var paramsWithKey = params || {};
        paramsWithKey.key = youTubeAPIKey;
        return youtubeUrl + action + '?' + queryString.stringify(paramsWithKey);
    };
};

module.exports = YouTube;
