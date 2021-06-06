DROP TABLE IF EXISTS inappropriateWords;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Valoration;
DROP TABLE IF EXISTS Photos;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
	userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	firstName VARCHAR(128) NOT NULL,
	lastName VARCHAR(128) NOT NULL,
	telephone VARCHAR(32) NOT NULL,
	email VARCHAR(128) UNIQUE NOT NULL,
	username VARCHAR(64) UNIQUE NOT NULL,
	password VARCHAR(256) NOT NULL,
	avatarUrl VARCHAR(512)
);


CREATE TABLE Photos (
	photoId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(128) NOT NULL,
	description VARCHAR(512),
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	url VARCHAR(512) NOT NULL,
	visibility VARCHAR(16) NOT NULL,
	userId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE,
	CONSTRAINT ValidVisibility CHECK (visibility in ('Public', 'Private'))
);


CREATE TABLE Valoration (
	valorationId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	value INT NOT NULL,
	userId INT NOT NULL,
	photoId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (userId),
	FOREIGN KEY (photoId) REFERENCES Photos (photoId) ON DELETE CASCADE,
	UNIQUE(userId, photoId),
	CONSTRAINT invalidValue CHECK (value >= 1 AND value <= 5) 
);


CREATE TABLE Comments (
	commentsId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	commentText VARCHAR(250) NOT NULL,
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	userId INT NOT NULL,
	photoId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (userId),
	FOREIGN KEY (photoId) REFERENCES Photos (photoId)
);

CREATE TABLE Category (
	categoryId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	categoryName VARCHAR(25) NOT NULL,
	photoId INT NOT NULL,
	FOREIGN KEY (photoId) REFERENCES Photos (photoId)
);

CREATE TABLE inappropriateWords (
	inappropriateWordsID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	words VARCHAR(30) NOT NULL
);