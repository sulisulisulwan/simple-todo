DROP DATABASE IF EXISTS simpleTodos;
CREATE DATABASE simpleTodos;
USE simpleTodos;

CREATE TABLE Users (
  userID INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(20),
  pw VARCHAR(50),
  PRIMARY KEY (userID)
);

CREATE TABLE Todos (
  todoID INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(20),
  todoText VARCHAR(256),
  isComplete BOOLEAN,
  userID INT NOT NULL,
  PRIMARY KEY (todoID),
  FOREIGN KEY (userID)
    REFERENCES Users(userID)
);


