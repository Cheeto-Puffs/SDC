const {answers} = require('../models');

module.exports = {

  getAnswers: (req, res) => {
    questions.listAnswers(req.query)
    .then((result) => {
      console.log(result);
      res.status(200).send(result.data)
    })
    .catch(err => console.log('Error getting answers: ', err))
  },
  postAnswers: (req, res) => {
    questions.addAnswer(req.body)
    .then((result) => {
      console.log(result);
      res.status(201).send()
    })
    .catch(err => console.log('Error adding answer: ', err))
  },
  putAnswerHelpful: (req, res) => {
    questions.markAnswerHelpful(req.params.answer_id)
    .then((result) => {
      console.log(result);
      res.status(200).send()
    })
    .catch(err => console.log('Error marking answer as helpful: ', err))
  },
  putAnswerReport: (req, res) => {
    questions.reportAnswer(req.params.question_id)
    .then((result) => {
      console.log(result);
      res.status(200).send()
    })
    .catch(err => console.log('Error reporting answer: ', err));
  }
}