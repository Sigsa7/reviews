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

 return `${restaurantName},${neighborhood},${keywords}\n`;
}

const seeding = () => {
  let i = 10000000;
  let data;

  const writeFile = fs.createWriteStream('./postgres_restaurants.csv');
  writeFile.write('restaurantname,neighborhood,keywords\n');


  const write = () => {
    let ok = true;
    do {
      i--;

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
