CREATE DATABASE notes_app;
USE notes_app;

CREATE TABLE notes(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents TEXT not null,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes(title,contents) values
('My first note','A note about Abhi'),
('My second note','A note about Manuj');

