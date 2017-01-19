var mcache = require('memory-cache');

var cache = function(/*[sec]*/duration) {
  return (req, res, next) => {
    let key = '_cache_' + req.originalUrl || req.url;
    console.log('cache key: ' + key);
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      console.log('use cache');
      res.send(cachedBody);
      return;
    } else {
      console.log('call original');
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, /*[ms]*/duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports = cache;
