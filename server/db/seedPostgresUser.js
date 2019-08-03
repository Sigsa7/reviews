const faker = require('faker');
const fs = require('fs');

const writeFile = fs.createWriteStream('./postgres_user.csv');
writeFile.write('userName, userLocation\n');

let i = 1000000;

let location;
let name;

while (i >= 0) {
  location = faker.address.city();
  name = `${faker.name.firstName()} ${faker.name.lastName()}`;

  writeFile.write(`${name},${location}\n`);

  i --;
}

writeFile.end()
