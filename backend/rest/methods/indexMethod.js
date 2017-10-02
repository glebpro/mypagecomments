
// from index.js <-> handlers
// redirects top level url requests  to some methods
// parse URL and POST data

// THIS FILE SERVES ( http://.../v1/...)

var express = require('express');
var indexMethodsRouter = express.Router();
var indexHandler = require('../handlers/indexHandler');

// define the home page route
indexMethodsRouter.get('/', function (req, res) {
  indexHandler.getHome(req, res);
});

// define the health check
indexMethodsRouter.get('/healthcheck', function (req, res) {
  indexHandler.getHealthCheck(req, res).then(function(getHealthCheck_result){
    res.send(getHealthCheck_result);
  });
})

// define the count words API
indexMethodsRouter.post('/countwords', function (req, res) {

  console.log('/v1/countwords method called');
  indexHandler.countWords(req, res);
});

// define the basic sentiment API
indexMethodsRouter.post('/sentiment', function (req, res) {

  console.log('/v1/sentiment method called');
  indexHandler.getSentiment(req, res);
});

module.exports = indexMethodsRouter;
