const path = require('path');
const url = require('url');
const express = require('express');
const mysql = require('mysql');
const mysqlConfig = require('../config/database.js');

// const AWS = require('aws-sdk');
// const fetch = require('node-fetch');
// const s3ImageSize = require('s3-image-size');

// AWS.config.loadFromPath(path.resolve(__dirname, '../config/aws.js'));
// const s3 = new AWS.S3();

const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static( publicPath ));
app.use('/listing/:pid', express.static( publicPath ));
app.use(express.json());

const pool = mysql.createPool(mysqlConfig);

app.get('/images/:pid', (req, res) => {
	const query = `SELECT image_url FROM images WHERE product_id='${req.params.pid}'`;
	pool.getConnection((err, connection) => {
		connection.query(query, (err, results) => {
			if (err) throw err;
			res.status(200).json( results );
			connection.release();
		});
	});
});

const port = 3001;
app.listen(port, console.log(`Listening on port ${port}...`));
