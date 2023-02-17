const db = require('../pgDB.js');
const { Pool } = require('pg');
const pool = new Pool();

module.exports = {

  listAnswers: (question_id) => {
    return pool.query(`SELECT * FROM answers WHERE question_id = ${question_id}`)
    .then(res => {
      // console.log(res.rows)
      return res.rows;
    })
    .catch(err => console.log('error getting answers in models: ', err))
  },
  addAnswer: (question_id, answer) => {
    return pool.query(`INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES (${question_id}, ${answer.body}, ${Date.now()}, ${answer.answerer_name}, ${answer.answerer_email}, 'f', 0)`)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log('error getting questions in models: ', err))
  },
  markAnswerHelpful: (answer_id) => {
    return pool.query(`UPDATE answers SET helpful = helpful + 1 WHERE answer_id = ${answer_id}`)
    .then(res => console.log(res))
    .catch(err => console.log('error updating helpful for answer in models: ', err))
  },
  reportAnswer: (answer_id) => {
    return pool.query(`UPDATE answers SET reported = 't' WHERE answer_id = ${answer_id}`)
    .then(res => console.log(res))
    .catch(err => console.log('error reporting answer in models: ', err))
  }
}