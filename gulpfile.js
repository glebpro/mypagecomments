var gulp = require('gulp');
var fs = require('fs');
var AWS = require('aws-sdk');

// var aws_creds = new AWS.SharedIniFileCredentials({profile: 'default'});
var BUCKET_NAME = 'mypagecomments.com';

var s3 = require('gulp-s3-upload')({});
// ({
// 	accessKeyId: aws_creds.accessKeyId,
// 	secretAccessKey: aws_creds.secretAccessKey,
// 	region: 'us-west-2'
// });

gulp.task('deploy', function() {
    gulp.src('./frontend_build/**')
        .pipe(s3({
            Bucket: BUCKET_NAME,
						ACL: 'public-read'
        }, {
            maxRetries: 5
        }))
    ;
});


gulp.task('default', function() {
	console.log('Gulp Commands Available');
	console.log('	deploy : deploy frontend_build/ to s3');
});
