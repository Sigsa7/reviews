const fs = require('fs');
const faker = require('faker');

let reviewCount;
let cpReviewCount;
let review;

let restaurant;
let foodRating;
let serviceRating;
let ambienceRating;
let valueRating;
let noise;
let isRecommended;
let notRecommended;

const generateRecord = () => {
  restaurant = {};
  restaurant.name = faker.lorem.word();
  restaurant.neighborhood = faker.address.city();
  restaurant.keyWords = [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()];
  restaurant.reviews = [];

  foodRating = 0;
  serviceRating = 0;
  ambienceRating = 0;
  valueRating = 0;
  noise = 0;
  isRecommended = 0;
  notRecommended = 0;

  reviewCount = Math.floor(Math.random() * 15);
  cpReviewCount = reviewCount;


  while (reviewCount > 0) {
    review = {};
    review.foodRating = Math.floor(Math.random() * 5) + 1;
    review.serviceRating = Math.floor(Math.random() * 5) + 1;
    review.ambienceRating = Math.floor(Math.random() * 5) + 1;
    review.valueRating = Math.floor(Math.random() * 5) + 1;
    review.helpfulCount = 0;
    review.noise = Math.floor(Math.random() * 5) + 1;
    review.reviewdate = faker.date.past();
    review.recommend = Math.random() <= 0.5;
    review.reviewText = faker.lorem.paragraph(2);
    review.user = {};
    review.user.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    review.user.location = faker.address.city();

    restaurant.reviews.push(review);

    foodRating += review.foodRating;
    serviceRating += review.serviceRating;
    ambienceRating += review.ambienceRating;
    valueRating += review.valueRating;
    noise += review.noise;

    if (review.recommend) {
      isRecommended ++;
    } else {
      notRecommended ++;
    }

    reviewCount --;
  }

  restaurant.avgFoodRating = foodRating / cpReviewCount;
  restaurant.avgServiceRating = serviceRating / cpReviewCount;
  restaurant.avgAmbienceRating = ambienceRating / cpReviewCount;
  restaurant.avgValueRating = valueRating / cpReviewCount;
  restaurant.avgNoise = noise / cpReviewCount;
  restaurant.recommend = isRecommended / (isRecommended + notRecommended);

  return JSON.stringify(restaurant) + '\n';
}

const seeding = () => {
  const writeFile = fs.createWriteStream('./mongo_data.json');

  const write = () => {
    let i = 10;
    let ok = true;

    do {
      i --;

      data = generateRecord();

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
