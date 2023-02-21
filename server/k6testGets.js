import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    {duration: '1m', target: 700},
    {duration: '1m', target: 1200},
    {duration: '1m', target: 1500},
    {duration: '1m', target: 1800},
    {duration: '2m', target: 1800},
    {duration: '1m', target: 1500}
  ]
  // vus: 300,
  // duration: '2m',
};

// get request for all questions with product id 10,
// all answers with question id 5, and all photos with answer id 3
export default function () {
  // http.batch([
  //   ['GET', 'http://localhost:3000/api/questions/10'],
  //   ['GET', 'http://localhost:3000/api/answers/5'],
  //   ['GET', 'http://localhost:3000/api/answersPhotos/5']
  // ]);
  // sleep(1);

  http.get('http://localhost:3000/api/questions/10');
  sleep(1);

  // http.get('http://localhost:3000/api/answers/5');
  // sleep(1);

  // http.get('http://localhost:3000/api/answersPhotos/5');
  // sleep(1);
}