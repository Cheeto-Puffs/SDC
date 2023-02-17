const db = require('../pgDB.js');
const { Pool } = require('pg');
const pool = new Pool();

module.exports = {

  listPhotos: (options, answer_id) => {
    return pool.query(`SELECT * FROM answers_photos WHERE answer_id = ${answer_id}`)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log('error getting photos in models: ', err));
  },
  addPhotos: (answer_id, urls) => {
    return urls.map((url) => {pool.query(`INSERT INTO answers_photos (answer_id, url) VALUES (${answer_id}, ${url})`)})
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log('error getting photos in models: ', err));
  }
}