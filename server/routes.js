const ctrl = require('./controllers');
const router = require('express').Router();

router.get('/questions/:product_id', ctrl.questions.getQuestions);
router.post('/questions/:product_id', ctrl.questions.postQuestions);
router.put('/questions/:question_id/helpful', ctrl.questions.putQuestionHelpful);
router.put('/questions/:question_id/reported', ctrl.questions.putQuestionReport);

router.get('/answers/:question_id', ctrl.answers.getAnswers);
router.post('/answers/:question_id', ctrl.answers.postAnswers);
router.put('/answers/:answer_id/helpful', ctrl.answers.putAnswerHelpful);
router.put('/answers/:answer_id/reported', ctrl.answers.putAnswerReport)

router.get('/answersPhotos/:answer_id', ctrl.answersPhotos.getPhotos);
router.post('/answersPhotos:answer_id', ctrl.answersPhotos.postPhotos);

module.exports = router;