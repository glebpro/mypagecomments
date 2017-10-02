
// from methods <-> handlers
// recieves parsed URl/POST data and does validation or additional parsing
// that requires more data fetched

var indexModel = require('../models/indexModel');

var indexHandler = {};

indexHandler.getHome = function(req, res){
  return new Promise(function(resolve, reject){
    // parse URLs/POST data
    var params = {};
    resolve(params);
  }).then(function(params){
    // go to model
    indexModel.getHomeModel(res, params);
  });
};

indexHandler.getHealthCheck = function(req, res){
  return new Promise(function(resolve, reject){
    // parse URLs/POST data
    var params = {};
    resolve(params);
  }).then(function(params){
    // go to model
    indexModel.getHealthCheck(res, params);
  });
}

indexHandler.countWords = function(req, res){

  console.log('/v1/countwords handler called');


  return new Promise(function(resolve, reject){
    // parse URLs/POST data
    var params = {
      data : req.body.data
    };
    resolve(params);
  }).then(function(params){
    // go to model
    indexModel.countWords(res, params);
  });
};

indexHandler.getSentiment = function(req, res){

  console.log('/v1/sentiment handler called');


  return new Promise(function(resolve, reject){
    // parse URLs/POST data
    var params = {
      data : req.body.data
    };
    resolve(params);
  }).then(function(params){
    // go to model
    indexModel.getSentiment(res, params);
  });
};



module.exports = indexHandler;
