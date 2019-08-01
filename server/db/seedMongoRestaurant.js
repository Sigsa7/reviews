const fs = require('fs');
const faker = require('faker');

let restaurantId;
let restaurantName;
let neighborhood;
let keywords;
let avgOverall;
let avgFood;
let avgService;
let avgAmbience;
let avgValue;
let avgNoise;
let avgRecommend;

const generateRecord = (i) => {
  restaurantId = i;
  restaurantName = faker.company.companyName();
  neighborhood = faker.address.city();
  keywords = `"${faker.lorem.word()}, ${faker.lorem.word()}, ${faker.lorem.word()}"`;
  avgOverall = Math.round(Math.random() * 4 * 100) / 100 + 1;
  avgFood = Math.round(Math.random() * 4 * 100) / 100 + 1;
  avgService = Math.round(Math.random() * 4 * 100) / 100 + 1;
  avgAmbience = Math.round(Math.random() * 4 * 100) / 100 + 1;
  avgValue = Math.round(Math.random() * 4 * 100) / 100 + 1;
  avgNoise = Math.round(Math.random() * 10 * 100) / 100 + 1;
  avgRecommend = Math.round(Math.random() * 100) / 100 + 1;

  return `${restaurantId},${restaurantName},${neighborhood},${keywords},${avgOverall},${avgFood},${avgService},${avgAmbience},${avgValue},${avgNoise},${avgRecommend}\n`;
}

const seeding = () => {
  const writeFile = fs.createWriteStream('./mongoRestaurant.csv');
  writeFile.write('restaurantId,restaurantname,neighborhood,keywords,avgOverall,avgFood,avgService,avgAmbience,avgValue,avgNoise,avgRecommend\n');

  let i = 10000000;

  const write = () => {

    let ok = true;
    do {
      i --;

      if (i % 100000 === 0) {
        console.log(i);
      }

      data = generateRecord(i);

      if (i === 1) {
        writeFile.write(data);
      } else {
        ok = writeFile.write(data);
      }
    } while (i > 1 && ok);
    if (i > 0) {
      writeFile.once('drain', write);
    }
  }

  write();
}

seeding();
