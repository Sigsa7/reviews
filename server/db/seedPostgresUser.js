const faker = require('faker');
const fs = require('fs');

const writeFile = fs.createWriteStream('./postgres_user.csv');
writeFile.write('name, location');
// id	location	name
let i = 1000000;
const records = [];

let location;
let name;

while (i >= 0) {
  location = faker.address.city();
  name = faker.lorem.word();

  writeFile.write(`${name},${location}\n`);

  i --;
}

writeFile.end();
