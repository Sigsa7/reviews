const faker = require('faker');
const fs = require('fs');
const moment = require('moment');

const today = moment();

let userid;
let foodrating;
let servicerating;
let ambiencerating;
let valuerating;
let reviewdate;
let noise;
let recommended;
let reviewtext;
let randomReviewCount;

const generateRecord = (restaurantid) => {
  userid = Math.floor(Math.random() * 1000000) + 1;
  foodrating = Math.floor(Math.random() * 5) + 1;
  servicerating = Math.floor(Math.random() * 5) + 1;
  ambiencerating = Math.floor(Math.random() * 5) + 1;
  valuerating = Math.floor(Math.random() * 5) + 1;
  noise = Math.floor(Math.random() * 10) + 1;
  recommended = Math.random() >= 0.5;
  reviewdate = Number(today.clone().subtract(Math.random() * 700, 'day').format('X'));
  reviewtext = faker.lorem.paragraph(2);

  return `${restaurantid},${userid},${foodrating},${servicerating},${ambiencerating},${valuerating},${noise},${recommended},${reviewdate},"${reviewtext}"\n`;
}

const seeding = () => {
  let i = 10000000;
  let data;

  const writeFile = fs.createWriteStream('./postgres_reviews.csv');
  writeFile.write('restaurantid,userid,foodrating,servicerating,ambiencerating,valuerating,noise,recommended,reviewdate,reviewtext\n');


  const write = () => {
    let ok = true;
    do {
      i--;

      if (i % 100000 === 0) {
        console.log(i)
      }

      randomReviewCount = Math.floor(Math.random() * 15);

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