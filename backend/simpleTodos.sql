DROP DATABASE IF EXISTS simpleTodos;

CREATE DATABASE simpleTodos;

USE simpleTodos;

CREATE TABLE Users (
  ID INT NOT NULL,
  username VARCHAR(20),
  pw VARCHAR(50),
  PRIMARY KEY (ID)
);



