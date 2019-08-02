import http from 'k6/http';
import { sleep } from 'k6';
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';
import { Rate } from "k6/metrics";

const myFailRate = new Rate("failed requests");

export const options = {
  vus: 200,
  duration: '30s',
};

export default () => {
  const sortOptions = ['highest rating', 'lowest rating', ''];
  const keywords = [];
  const restaurantId = Math.floor(Math.random() * 10000001);
  const sort = sortOptions[Math.floor(Math.random() * 3)];
  const star = Math.floor(Math.random() * 6);

  let randomKeywordCount = Math.floor(Math.random() * 4);

  while (randomKeywordCount > 0) {
    keywords.push(faker.lorem.word());
    randomKeywordCount --;
  }

  const body = JSON.stringify({ sort, star, keywords });

  let res = http.request(
    'GET',
    `http://localhost:3004/${restaurantId}/reviews`,
    body,
    { headers: { 'Content-Type': 'application/json' } },
  );
  myFailRate.add(res.status != 200);
}
