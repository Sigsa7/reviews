const faker = require('faker');
const fs = require('fs');

const writeFile = fs.createWriteStream('./generatePayload.json');

let i = 1;
const sortOptions = ['highest rating', 'lowest rating', ''];
const keys = ['sort', 'keywords', 'star'];
const values = [];

let keywords;
let sort;
let star;
let randomKeywordCount;

while (i > 0) {
  let keywords = [];
  sort = sortOptions[Math.floor(Math.random() * 3)];
  star = Math.floor(Math.random() * 6);

  randomKeywordCount = Math.floor(Math.random() * 4);

  while (randomKeywordCount > 0) {
    keywords.push(faker.lorem.word());
    randomKeywordCount --;
  }

  values.push([sort, keywords, star]);

  i --;
}

const body = {};
body.keys = keys;
body.values = values;

writeFile.write(JSON.stringify(body));

writeFile.end()
