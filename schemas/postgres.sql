DROP DATABASE IF EXISTS questionsanswers;

CREATE DATABASE questionsanswers;

DROP TABLE IF EXISTS Questions CASCADE;

CREATE TABLE Questions (
 id SERIAL PRIMARY KEY,
 product_id INTEGER,
 body VARCHAR(1000),
 date_written BIGINT,
 asker_name VARCHAR(60),
 asker_email VARCHAR(60),
 reported BOOLEAN,
 helpful INTEGER
);

DROP TABLE IF EXISTS Answers CASCADE;

CREATE TABLE Answers (
 id SERIAL PRIMARY KEY,
 question_id INTEGER REFERENCES Questions(id),
 body VARCHAR(1000),
 date_written BIGINT,
 answerer_name VARCHAR(60),
 answerer_email VARCHAR(60),
 reported BOOLEAN,
 helpful INTEGER
);

DROP TABLE IF EXISTS answers_photos;

CREATE TABLE answers_photos (
 id SERIAL PRIMARY KEY,
 answer_id INTEGER REFERENCES Answers(id),
 url VARCHAR(2048)
);


COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM '/Users/jacobfink/Documents/Hack-Reactor-Junior-Phase/SDC/csvFiles/questions.csv' DELIMITER ',' CSV HEADER;

COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM '/Users/jacobfink/Documents/Hack-Reactor-Junior-Phase/SDC/csvFiles/answers.csv' DELIMITER ',' CSV HEADER;

COPY answers_photos(id, answer_id, url) FROM '/Users/jacobfink/Documents/Hack-Reactor-Junior-Phase/SDC/csvFiles/answers_photos.csv' DELIMITER ',' CSV HEADER;