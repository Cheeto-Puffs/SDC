import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '20s',
};

// get request for all questions with product id 10,
// all answers with question id 5, and all photos with answer id 3
export default function () {
  http.get('http://localhost:3000/api/questions/10');
  sleep(1);

  http.get('http://localhost:3000/api/answers/5');
  sleep(1);

  http.get('http://localhost:3000/api/answersPhotos/5');
  sleep(1);
}