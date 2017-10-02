
// from handlers <-> models
// organize the data in and out of processing/storage

const PythonShell = require('python-shell');
const moment = require('moment');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const indexModel = {};

// grab credentials from default profile
var credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;

var s3 = new AWS.S3();

indexModel.getHomeModel = function(res, params){
  res.json({ 'data': 'Hello from the home page!'});
}

indexModel.getHealthCheck = function(res, params){
  res.json({ 'data': '/v1/ health check complete'});
}

indexModel.countWords = function(res, params){

  console.log('/v1/countwords model called');

  const bucketName = 'mypagecomments-countwords-text';
  const fileName = 'countwords-text-'+moment().format('DD-MM-YYYY-hh-mm-ss')+'.txt';

  var s3params = {
   Body: params.data,
   Bucket: bucketName,
   Key: fileName,
  };

  s3.putObject(s3params, function(err, data) {
    if (err){ console.log(err, err.stack); } // an error occurred
    else {

      var pythonOptions = {
        // mode: 'text',
        scriptPath: path.resolve(__dirname, '../../nlp/'),
        args: [bucketName, fileName]
      };

      PythonShell.run('countWords.py', pythonOptions, function (pyerr, results) {
        if (pyerr){ console.log(pyerr, pyerr.stack); } // an error occurred

        res.json({ 'number_words': parseInt(results[0]) });

      });

    }
  });

}

indexModel.getSentiment = function(res, params){

  console.log('/v1/getSentiment model called');

  const filename = 'corpra/sentiment-text-'+moment().format('DD-MM-YYYY-hh-mm-ss')+'.txt';
  const nlp_root = '../../nlp/';

  fs.writeFile(path.resolve(__dirname, nlp_root+filename), params.data, function(err) {
      if(err) { return console.log(err); }
      console.log("The sentiment file was saved!");
  });

  var pythonOptions = {
    scriptPath: path.resolve(__dirname, nlp_root),
    args: [filename]
  };

  PythonShell.run('getSentiment.py', pythonOptions, function (pyerr, results) {
    if (pyerr){ res.json({'ERROR': JSON.stringify(pyerr.stack)}) } // an error occurred

    fs.unlink(path.resolve(__dirname, nlp_root+filename), function(){})

    res.json({ 'sentiment': results[0] });

  });

};

module.exports = indexModel;
