const faker = require('faker');
const fs = require('fs');

let restaurantName;
let neighborhood;
let keywords;
let keywordsCount

const generateRecord = () => {
  restaurantName = faker.lorem.word();
  neighborhood = faker.address.city();
  keywords = `"{${faker.lorem.word()}, ${faker.lorem.word()}, ${faker.lorem.word()}}"`;
  avgOverall = Math.round(Math.random() * 4 * 100) / 100 + 1;
  avgFood = Math.round(Math.random() * 4 * 100) / 100 + 1;
  avgService = Math.round(Math.random() * 4 * 100) / 100 + 1;
  avgAmbience = Math.round(Math.random() * 4 * 100) / 100 + 1;
  avgValue = Math.round(Math.random() * 4 * 100) / 100 + 1;
  avgNoise = Math.round(Math.random() * 10 * 100) / 100 + 1;
  avgRecommend = Math.round(Math.random()* 100) / 100;

 return `${restaurantName},${neighborhood},${keywords},${avgOverall},${avgFood},${avgService},${avgAmbience},${avgValue},${avgNoise},${avgRecommend}\n`;
}

const seeding = () => {
  let i = 10000000;
  let data;

  const writeFile = fs.createWriteStream('./postgres_restaurants.csv');
  writeFile.write('restaurantname,neighborhood,keywords,avgOverall,avgFood,avgService,avgAmbience,avgValue,avgNoise,avgRecommend\n');


  const write = () => {
    let ok = true;
    do {
      i--;

      if (i % 1000000) {
        console.log(i);
      }

      data = generateRecord();
      if (i === 0) {
        // Last time!
        writeFile.write(data);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writeFile.write(data);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writeFile.once('drain', write);
    }
  }
  write();
}

seeding();
