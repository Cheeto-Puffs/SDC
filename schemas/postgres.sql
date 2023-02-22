DROP TABLE IF EXISTS Questions CASCADE;

CREATE TABLE Questions (
 q_id SERIAL PRIMARY KEY,
 product_id INTEGER,
 q_body VARCHAR(1000),
 q_date_written BIGINT,
 asker_name VARCHAR(60),
 asker_email VARCHAR(60),
 q_reported BOOLEAN,
 q_helpful INTEGER
);

CREATE INDEX prod_id_idx ON Questions(product_id);

DROP TABLE IF EXISTS Answers CASCADE;

CREATE TABLE Answers (
 a_id SERIAL PRIMARY KEY,
 question_id INTEGER REFERENCES Questions(q_id),
 a_body VARCHAR(1000),
 a_date_written BIGINT,
 answerer_name VARCHAR(60),
 answerer_email VARCHAR(60),
 a_reported BOOLEAN,
 a_helpful INTEGER
);

CREATE INDEX q_id_idx ON Answers(question_id);

DROP TABLE IF EXISTS answers_photos;

CREATE TABLE answers_photos (
 p_id SERIAL PRIMARY KEY,
 answer_id INTEGER REFERENCES Answers(a_id),
 url VARCHAR(2048)
);

CREATE INDEX a_id_idx ON answers_photos(answer_id);

COPY questions(q_id, product_id, q_body, q_date_written, asker_name, asker_email, q_reported, q_helpful) FROM '/Users/jacobfink/Documents/Hack-Reactor-Junior-Phase/SDC/csvFiles/questions.csv' DELIMITER ',' CSV HEADER;

COPY answers(a_id, question_id, a_body, a_date_written, answerer_name, answerer_email, a_reported, a_helpful) FROM '/Users/jacobfink/Documents/Hack-Reactor-Junior-Phase/SDC/csvFiles/answers.csv' DELIMITER ',' CSV HEADER;

COPY answers_photos(p_id, answer_id, url) FROM '/Users/jacobfink/Documents/Hack-Reactor-Junior-Phase/SDC/csvFiles/answers_photos.csv' DELIMITER ',' CSV HEADER;

SELECT setval(pg_get_serial_sequence('questions', 'q_id'), (SELECT MAX(q_id) FROM questions));

SELECT to_timestamp(q_date_written / 1000) FROM questions;

SELECT setval(pg_get_serial_sequence('answers', 'a_id'), (SELECT MAX(a_id) FROM answers));

SELECT to_timestamp(a_date_written / 1000) FROM answers;

SELECT setval(pg_get_serial_sequence('answers_photos', 'p_id'), (SELECT MAX(p_id) FROM answers_photos));


-- 1 Upload file by running command in local terminal "scp -i 'path/to/key-pair-file' 'path/to/local/file' 'username@public-dns-of-ec2-instance':'path/on/ec2/instance'"
-- "scp -i /Users/jacobfink/Documents/Hack-Reactor-Junior-Phase/aws/qnaSDC.pem /Users/jacobfink/Documents/Hack-Reactor-Junior-Phase/SDC/csvFiles/answers.csv ubuntu@ec2-35-93-32-213.us-west-2.compute.amazonaws.com:home/ubuntu/SDC_Data"