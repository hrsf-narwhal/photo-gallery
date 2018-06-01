const path = require('path');
const express = require('express');
const AWS = require('aws-sdk');

const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static( publicPath ));

AWS.config.loadFromPath(path.resolve(__dirname, '../config/config.js'));
const s3 = new AWS.S3();

var s3Bucket = new AWS.S3({
	params: {
		Bucket: 'hrsf-itsy-photos'
	}
});

let imageParams = {
	Bucket: 'hrsf-itsy-photos',
	Key: '1026-07.jpg'
}
s3Bucket.getSignedUrl('getObject', imageParams, function(err, url){
  console.log('the url of the image is', url);
})

s3.listObjects({
	Bucket: 'hrsf-itsy-photos'
}, function(err, data){
  var bucketContents = data.Contents;
    for (var i = 0; i < bucketContents.length; i++){
      var urlParams = {Bucket: 'hrsf-itsy-photos', Key: bucketContents[i].Key};
        s3.getSignedUrl('getObject',urlParams, function(err, url){
          console.log('the url of the image is', url);
        });
    }
});

const port = 3001;
app.listen(port, console.log(`Listening on port ${port}...`));
