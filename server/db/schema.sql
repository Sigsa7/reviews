DROP TABLE reviews;
DROP TABLE restaurants;
DROP TABLE users;

CREATE TABLE IF NOT EXISTS restaurants (
  id bigserial PRIMARY KEY,
  restaurantName varchar(100) NOT NULL,
  neighborhood varchar(100) NOT NULL,
  keywords text[],
  avgOverall real,
  avgFood real,
  avgService real,
  avgAmbience real,
  avgValue real,
  avgNoise real,
  avgRecommend real
);

CREATE TABLE IF NOT EXISTS users (
  id bigserial PRIMARY KEY,
  userName varchar(100) NOT NULL,
  userLocation varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
  id bigserial NOT NULL PRIMARY KEY,
  restaurantId bigserial REFERENCES restaurants(id),
  userId bigserial REFERENCES users(id),
  foodRating smallint NOT NULL,
  serviceRating smallint NOT NULL,
  ambienceRating smallint NOT NULL,
  valueRating smallint NOT NULL,
  helpfulCount smallint DEFAULT 0,
  reviewDate int,
  noise smallint NOT NULL,
  recommended boolean NOT NULL,
  reviewText varchar(1000) NOT NULL
);

COPY users(userName, userLocation) from '/Users/jenniezeng/Documents/HackReactor/Course/SDC/reviews/server/db/postgres_user.csv' DELIMITER ',' CSV HEADER;

COPY restaurants(restaurantName, neighborhood, keywords,avgOverall,avgFood,avgService,avgAmbience,avgValue,avgNoise,avgRecommend) from '/Users/jenniezeng/Documents/HackReactor/Course/SDC/reviews/server/db/postgres_restaurants.csv' DELIMITER ',' CSV HEADER;

COPY reviews(restaurantid,userid,foodrating,servicerating,ambiencerating,valuerating,noise,recommended,reviewdate,reviewtext) from '/Users/jenniezeng/Documents/HackReactor/Course/SDC/reviews/server/db/postgres_reviews.csv' DELIMITER ',' CSV HEADER;

CREATE index idx_restaurant_id ON reviews(restaurantId);
CREATE index idx_user_id ON reviews(userId);
