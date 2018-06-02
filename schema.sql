DROP DATABASE IF EXISTS itsy_photos;
CREATE DATABASE IF NOT EXISTS itsy_photos;

USE itsy_photos;

CREATE TABLE IF NOT EXISTS images (
	product_id INT NOT NULL,
	image_id INT NOT NULL AUTO_INCREMENT,
	image_url TEXT NOT NULL,
	image_name VARCHAR(255) NOT NULL,
	title TEXT,
	caption TEXT,
	width INT,
	height INT,
	PRIMARY KEY (image_id)
);
