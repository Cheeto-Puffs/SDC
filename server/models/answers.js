const db = require('../pgDB.js');
const { Pool } = require('pg');

module.exports = {

  listAnswers: (question_id, page = 1, count = 5) => {
    return db.query(`SELECT json_build_object(
      'question', ${question_id},
      'page', ${page},
      'count', ${count},
      'results', json_agg(
        json_build_object(
          'answer_id', a_id,
          'body', a_body,
          'date', a_date_written,
          'answerer_name', answerer_name,
          'helpfulness', a_helpful,
          'photos', (
            SELECT json_agg(
              json_build_object(
                'id', p_id,
                'url', url
              )
            ) FROM answers_photos WHERE answer_id = a_id
          )
        )
      )
    ) FROM answers WHERE question_id = ${question_id} LIMIT ${count}`)
    .then(res => {
      // console.log(res.rows)
      return Object.values(res.rows[0])[0];
    })
    .catch(err => console.log('error getting answers in models: ', err))
  },
  addAnswer: (question_id, answer) => {
    return db.query(`INSERT INTO answers (question_id, a_body, a_date_written, answerer_name, answerer_email, a_reported, a_helpful) VALUES (${question_id}, '${answer.body}', ${Date.now()}, '${answer.answerer_name}', '${answer.answerer_email}', 'f', 0)`)
    .then(res => {
      // console.log(res)
      answer.photos.map((url) => {
        return pool.query(`INSERT INTO answers_photos (answer_id, url) VALUES ((SELECT Max(a_id) FROM answers), '${url}')`)
        // .then(res => console.log(res))
        .then(res => null)
        .catch(err => console.log('error posting photos in models: ', err)
      )})
    })
    .catch(err => console.log('error getting questions in models: ', err))
  },
  markAnswerHelpful: (answer_id) => {
    return db.query(`UPDATE answers SET a_helpful = a_helpful + 1 WHERE a_id = ${answer_id}`)
    .then(res => console.log(res))
    .catch(err => console.log('error updating helpful for answer in models: ', err))
  },
  reportAnswer: (answer_id) => {
    return db.query(`UPDATE answers SET a_reported = 't' WHERE a_id = ${answer_id}`)
    .then(res => console.log(res))
    .catch(err => console.log('error reporting answer in models: ', err))
  }
}