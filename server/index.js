const path = require('path');
const express = require('express');
const mysql = require('mysql');
const mysqlConfig = require('../config/database.js');
const fetch = require('node-fetch');
const AWS = require('aws-sdk');
const s3ImageSize = require('s3-image-size');

const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static( publicPath ));
app.use(express.json());

const pool = mysql.createPool(mysqlConfig);

AWS.config.loadFromPath(path.resolve(__dirname, '../config/aws.js'));
const s3 = new AWS.S3();

app.get('/seed', (req, res) => {
  s3.listObjects({
    Bucket: 'hrsf-itsy-photos'
  }, (err, data) => {
    if ( err ) {
      res.status(500).end();
    }
    let bucketContents = data.Contents;
    for ( var i = 0; i < bucketContents.length; i++ ) {
      let params = {
        Bucket: 'hrsf-itsy-photos',
        Key: bucketContents[i].Key
      };
      s3.getSignedUrl('getObject', params, (err, url) => {

        let key = params.Key.split('/');
        let product_id = key[0];
        let image_url = url.split('?')[0];
        let image_name = key[1];
      
        s3ImageSize(s3, 'hrsf-itsy-photos', params.Key, 
        (err, dimensions, bytesRead) => {
          if (err) console.log(err);

          let width = dimensions.width;
          let height = dimensions.height;

          let query = `INSERT INTO images (product_id, image_url, image_name, width, height) VALUES ('${product_id}', '${image_url}', '${image_name}', ${width}, ${height})`;

          pool.getConnection((err, connection) => {
            connection.query(query, (err, results) => {
              if (err) throw err;
              connection.release();
            });
          }); // pool
        }); // s3ImageSize
      }); // s3.getSignedUrl
    }
    res.status(200).send( req.body );
  }); // listObjects
}); // app.get


const port = 3001;
app.listen(port, console.log(`Listening on port ${port}...`));
