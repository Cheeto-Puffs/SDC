require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./pgDB.js');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
const router = require('./routes.js');

app.use('/api', router);

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);