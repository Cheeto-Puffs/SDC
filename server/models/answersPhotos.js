const db = require('../pgDB.js');
const { Pool } = require('pg');

module.exports = {

  listPhotos: (answer_id) => {
    return db.query(`SELECT * FROM answers_photos WHERE answer_id = ${answer_id}`)
    .then(res => res.rows)
    .catch(err => console.log('error getting photos in models: ', err));
  },
  addPhotos: (answer_id, photos) => {
    photos.urls.map((url) => {
      return db.query(`INSERT INTO answers_photos (answer_id, url) VALUES (${answer_id}, '${url}')`)
      .then(res => console.log(res))
      .catch(err => console.log('error posting photos in models: ', err)
    )});
  }
}