import http from 'k6/http';
import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  stages: [
    {duration: '1m', target: 700},
    {duration: '1m', target: 1200},
    {duration: '1m', target: 1500},
    {duration: '1m', target: 1800},
    // {duration: '2m', target: 1800},
    {duration: '1m', target: 1500}
  ]
  // vus: 300,
  // duration: '2m',
};

// get request for all questions with product id 10,
// all answers with question id 5, and all photos with answer id 3
export default function () {
  let prodId = randomIntBetween(1, 1000011);
  let quesId = randomIntBetween(1, 3518963);
  let ansId = randomIntBetween(1, 6879306);

  // http.batch([
  //   [`GET`, `http://localhost:3000/api/questions/${prodId}`],
  //   [`GET`, `http://localhost:3000/api/answers/${quesId}`],
  //   [`GET`, `http://localhost:3000/api/answersPhotos/${ansId}`]
  // ]);
  // sleep(1);

  // http.get(`http://localhost:3000/api/qa/questions/${prodId}`);
  // sleep(1);

  http.get(`http://localhost:3000/api/qa/questions/${quesId}/answers/`);
  sleep(1);

  // http.get(`http://localhost:3000/api/answersPhotos/${ansId}`);
  // sleep(1);
}