CREATE DATABASE IF NOT EXISTS 1proyectoblog;

use 1proyectoblog;

CREATE TABLE IF NOT EXISTS roles (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    address VARCHAR(1024),
	picture VARCHAR(1024),
    role INT UNSIGNED,
    FOREIGN KEY (role) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS categorias (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS articulos (
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  postName VARCHAR(256) NOT NULL UNIQUE,
  postContent VARCHAR(1024) NOT NULL,
  postCategory INT UNSIGNED NOT NULL,
  postDate varchar(256) NOT NULL,
  userID INT UNSIGNED NOT NULL,
  picture varchar(256) NOT NULL
  FOREIGN KEY (postCategory) REFERENCES categorias(id)
  FOREIGN KEY (userID) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS comentarios (
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userComment varchar(256) NOT NULL,
  commentDate varchar(256) NOT NULL,
  userID int(11) NOT NULL,
  postID int(11) NOT NULL
  FOREIGN KEY (userID) REFERENCES usuarios(id)
  FOREIGN KEY (postID) REFERENCES articulos(id)
);

CREATE TABLE IF NOT EXISTS respuestas (
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userReply varchar(256) NOT NULL,
  replyDate varchar(256) NOT NULL,
  userID int(11) NOT NULL,
  commentID int(11) NOT NULL,
  postID int(11) NOT NULL
  FOREIGN KEY (userID) REFERENCES usuarios(id)
  FOREIGN KEY (postID) REFERENCES articulos(id)
  FOREIGN KEY (commentID) REFERENCES comentarios(id)
);

