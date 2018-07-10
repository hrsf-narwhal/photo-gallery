const path = require('path');
const url = require('url');
const mysql = require('mysql');
const AWS = require('aws-sdk');
const s3ImageSize = require('s3-image-size');

require('dotenv').config();

const pool = mysql.createPool({
	host: 'itsydb.c9wegemcd5kh.us-east-1.rds.amazonaws.com',
	port: '3306',
	user: '',
	password: '',
	database: ''
});

const closePool = () => {
	console.log('Seeding complete.');
	pool.end();
}

AWS.config.credentials = new AWS.SharedIniFileCredentials();
const s3 = new AWS.S3();

const config = {
	bucket: 'hrsf-itsy-photos',
	staticWebsiteUrl: 'http://hrsf-itsy-photos.s3-website-us-west-1.amazonaws.com'
};

s3.listObjectsV2({
	Bucket: config.bucket,
	Delimiter: 'images',
	Prefix: 'images'
}, (err, data) => {
	if (err) {
		console.log(err);
	}

	let bucketContents = data.Contents;
	let remainingSeed = bucketContents.length;

	console.log(`Seeding the database with ${remainingSeed} items...`);

	for ( let i = 0; i < bucketContents.length; i++ ) {
		let params = {
			Bucket: config.bucket,
			Key: bucketContents[i].Key
		};
		s3.getSignedUrl('getObject', params, (err, theUrl) => {
			if (err) {
				console.log(err);
			}

			const key = params.Key.split('/');
			const product_id = key[1];
			const image_url = url.resolve(config.staticWebsiteUrl, url.parse(theUrl).pathname);
			const image_name = key[2];

			s3ImageSize(s3, config.bucket, params.Key, (err, dimensions, bytesRead) => {
				if (err) {
					console.log(err);
				}
				const [width, height] = [dimensions.width, dimensions.height];

				const query = `INSERT INTO images (product_id, image_url, image_url_hash, image_name, width, height) VALUES ('${product_id}', '${image_url}', SHA2('${image_url}', 256),'${image_name}', ${width}, ${height}) ON DUPLICATE KEY UPDATE width=${width}, height=${height}`;

				pool.getConnection((err, connection) => {
					connection.query(query, (err, results) => {
						if (err) throw err;
						connection.release();
						console.log(remainingSeed);
						if ( --remainingSeed === 0 ) closePool();
					});
				}); // pool
			}); // s3ImageSize
		}); // getSignedUrl
	} // for loop
}); // listObjectsV2