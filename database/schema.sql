DROP DATABASE IF EXISTS itsyphotos;
CREATE DATABASE IF NOT EXISTS itsyphotos;

USE itsyphotos;

CREATE TABLE IF NOT EXISTS images (
	product_id INT NOT NULL,
	image_id INT NOT NULL AUTO_INCREMENT,
	image_url TEXT NOT NULL,
	image_url_hash CHAR(64) UNIQUE,
	image_name VARCHAR(255) NOT NULL,
	title TEXT,
	caption TEXT,
	width INT,
	height INT,
	PRIMARY KEY (image_id)
);
