-- DROP DATABASE IF EXISTS questionsAnswers;

-- CREATE DATABASE questionsAnswers;

-- \c questionsAnswers;

DROP TABLE IF EXISTS Questions;

CREATE TABLE Questions (
 id BIGSERIAL,
 product_id INTEGER,
 body VARCHAR(1000),
 date_written BIGINT,
 asker_name VARCHAR(60),
 asker_email VARCHAR(60),
 reported BOOLEAN,
 helpful INTEGER
);

ALTER TABLE Questions ADD CONSTRAINT Questions_pkey PRIMARY KEY (id);

DROP TABLE IF EXISTS Answers;

CREATE TABLE Answers (
 id BIGSERIAL,
 question_id INTEGER,
 body VARCHAR(1000),
 date_written INTEGER,
 answerer_name VARCHAR(60),
 answerer_email VARCHAR(60),
 reported BOOLEAN,
 helpful INTEGER
);


ALTER TABLE Answers ADD CONSTRAINT Answers_pkey PRIMARY KEY (id);

DROP TABLE IF EXISTS Photos;

CREATE TABLE Photos (
 id BIGSERIAL,
 answer_id INTEGER,
 url VARCHAR(255)
);

ALTER TABLE Photos ADD CONSTRAINT Photos_pkey PRIMARY KEY (id);

ALTER TABLE Answers ADD CONSTRAINT Answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES Questions(id);
ALTER TABLE Photos ADD CONSTRAINT Photos_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES Answers(id);