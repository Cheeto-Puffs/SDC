const mongoose = require('mongoose');

let questionSchema = mongoose.Schema({
  product_id: Number, //?
  body: String,
  date_written: Number,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpful: Number,
  answers: [answerSchema]
})

let answerSchema = mongoose.Schema({
  body: String,
  date_written: Number,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpful: Number
  photos: [photoSchema]
})

let photoSchema = mongoose.Schema({
  url: String
})