const path = require('path');
const url = require('url');
const express = require('express');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static( publicPath ));
app.use('/listing/:pid', express.static( publicPath ));
app.use(express.json());

const pool = mysql.createPool({
	user: process.env.DB_USER,
	database: process.env.DB_NAME
});

app.get('/images/:pid', (req, res) => {
	const query = `SELECT image_url FROM images WHERE product_id='${req.params.pid} ORDER BY image_name ASC'`;
	pool.getConnection((err, connection) => {
		connection.query(query, (err, results) => {
			if (err) throw err;

			// Sort here on the server, because the MySQL query 
			// is somehow returning an array out-of-order
			results = results.sort( (a, b) => {
				if ( a.image_url < b.image_url ) {
					return -1;
				} 
				if ( a.image_url > b.image_url ) {
					return 1;
				} 
				return 0;
			});

			res.status(200).json( results );
			connection.release();
		});
	});
});

const port = 3001;
app.listen(port, console.log(`Listening on port ${port}...`));
