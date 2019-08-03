const faker = require('faker');
const fs = require('fs');
const moment = require('moment');

const today = moment();

let userid;
let foodrating;
let servicerating;
let ambiencerating;
let valuerating;
let avgrating;
let reviewdate;
let noise;
let recommended;
let reviewtext;
let randomReviewCount;
let normalized;

const randn_bm = (min, max, skew) => {
  let u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
  num = Math.pow(num, skew); // Skew
  num *= max - min; // Stretch to fill range
  num += min; // offset to min
  return num;
}

const generateRecord = (restaurantid) => {
  userid = Math.floor(Math.random() * 1000000) + 1;
  foodrating = Math.floor(Math.random() * 5) + 1;
  servicerating = Math.floor(Math.random() * 5) + 1;
  ambiencerating = Math.floor(Math.random() * 5) + 1;
  valuerating = Math.floor(Math.random() * 5) + 1;
  avgrating = (foodrating + servicerating + ambiencerating + valuerating) / 4;
  noise = Math.floor(Math.random() * 10) + 1;
  recommended = Math.random() >= 0.5;
  reviewdate = Number(today.clone().subtract(Math.random() * 700, 'day').format('X'));
  reviewtext = faker.lorem.paragraph(2);

  return `${restaurantid},${userid},${foodrating},${servicerating},${ambiencerating},${valuerating},${avgrating},${noise},${recommended},${reviewdate},"${reviewtext}"\n`;
}

const seeding = () => {
  let i = 10000000;
  let data;

  const writeFile = fs.createWriteStream('./postgres_reviews.csv');
  writeFile.write('restaurantid,userid,foodrating,servicerating,ambiencerating,valuerating,avgrating,noise,recommended,reviewdate,reviewtext\n');


  const write = () => {
    let ok = true;
    do {
      i--;

      normalized = randn_bm(0, 1, 5);
      randomReviewCount = normalized * 100;

      while (randomReviewCount > 0) {
        data = generateRecord(i);
        if (i === 1) {
          // Last time!
          writeFile.write(data);
        } else {
          // See if we should continue, or wait.
          // Don't pass the callback, because we're not done yet.
          ok = writeFile.write(data);
        }
        randomReviewCount --;
      }
    } while (i > 1 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writeFile.once('drain', write);
    }
  }
  write();
}

seeding();