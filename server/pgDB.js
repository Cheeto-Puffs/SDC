const { Client, Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_HOST,
  password: process.enc.DB_USER,
  database: 'questionsanswers',
  port: 3000
});

//module.exports =