const faker = require('faker');
const fs = require('fs');

const writeFile = fs.createWriteStream('./mongoUsers.csv');
writeFile.write('userId,userName,userLocation\n');

let i = 1000000;

let location;
let name;
let userId;

while (i >= 0) {
  userId = i;
  location = faker.address.city();
  name = `${faker.name.firstName()} ${faker.name.lastName()}`;

  writeFile.write(`${userId},${name},${location}\n`);

  i --;
}

writeFile.end();
