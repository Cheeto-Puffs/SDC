const db = require('../pgDB.js');
const { Pool } = require('pg');
const pool = new Pool({
  database: process.env.DB_NAME
});

module.exports = {

  listQuestions: (product_id) => {
    return pool.query(`SELECT * FROM questions WHERE product_id = ${product_id}`)
    .then(res => {
      // console.log(res.rows)
      return res.rows;
    })
    .catch(err => console.log('error getting questions in models: ', err))
  },
  addQuestion: (product_id, question) => {
    console.log(question.body);
    return pool.query(`INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES (${product_id}, '${question.body}', ${Date.now()}, '${question.asker_name}', '${question.asker_email}', 'f', 0)`)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log('error posting question in models: ', err))
  },
  markQuestionHelpful: (question_id) => {
    return pool.query(`UPDATE questions SET helpful = helpful + 1 WHERE question_id = ${question_id}`)
    .then(res => console.log(res))
    .catch(err => console.log('error updating helpful for question in models: ', err))
  },
  reportQuestion: (question_id) => {
    return pool.query(`UPDATE questions SET reported = 't' WHERE question_id = ${question_id}`)
    .then(res => console.log(res))
    .catch(err => console.log('error reporting question in models: ', err))
  }
}