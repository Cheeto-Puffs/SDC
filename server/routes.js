const ctrl = require('./controllers');
const router = require('express').Router();

router.get('/qa/questions/:product_id', ctrl.questions.getQuestions);
router.post('/qa/questions/:product_id', ctrl.questions.postQuestions);
router.put('/qa/questions/:question_id/helpful', ctrl.questions.putQuestionHelpful);
router.put('/qa/questions/:question_id/reported', ctrl.questions.putQuestionReport);

router.get('/qa/questions/:question_id/answers', ctrl.answers.getAnswers);
router.post('/qa/questions/:question_id/answers', ctrl.answers.postAnswers);
router.put('/qa/answers/:answer_id/helpful', ctrl.answers.putAnswerHelpful);
router.put('/qa/answers/:answer_id/reported', ctrl.answers.putAnswerReport)

// router.get('/answersPhotos/:answer_id', ctrl.answersPhotos.getPhotos);
// router.post('/answersPhotos/:answer_id', ctrl.answersPhotos.postPhotos);

module.exports = router;