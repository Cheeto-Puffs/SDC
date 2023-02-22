const db = require('../pgDB.js');
const { Pool } = require('pg');

module.exports = {

  listQuestions: (product_id, count = 5, page = 1) => {
    return db.query(`SELECT json_build_object(
      'product_id', ${product_id},
      'results', json_agg(
        json_build_object(
          'question_id', q_id,
          'question_body', q_body,
          'question_date', q_date_written,
          'asker_name', asker_name,
          'question_helpfulness', q_helpful,
          'reported', q_reported,
          'answers', (
            SELECT json_object_agg(
              a_id, json_build_object(
                'id', a_id,
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
            ) as q_id FROM answers WHERE question_id = q_id
          )
        )
      )
    ) FROM questions WHERE product_id = ${product_id} LIMIT ${count}`)
    .then(res => {
      return Object.values(res.rows[0])[0];
    })
    .catch(err => console.log('error getting questions in models: ', err))
  },
  addQuestion: (product_id, question) => {
    console.log(question.body);
    return db.query(`INSERT INTO questions (product_id, q_body, q_date_written, asker_name, asker_email, q_reported, q_helpful) VALUES (${product_id}, '${question.body}', ${Date.now()}, '${question.asker_name}', '${question.asker_email}', 'f', 0)`)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log('error posting question in models: ', err))
  },
  markQuestionHelpful: (question_id) => {
    return db.query(`UPDATE questions SET q_helpful = q_helpful + 1 WHERE q_id = ${question_id}`)
    .then(res => console.log(res))
    .catch(err => console.log('error updating helpful for question in models: ', err))
  },
  reportQuestion: (question_id) => {
    return db.query(`UPDATE questions SET q_reported = 't' WHERE q_id = ${question_id}`)
    .then(res => console.log(res))
    .catch(err => console.log('error reporting question in models: ', err))
  }
}