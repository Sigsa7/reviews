CREATE DATABASE IF NOT EXISTS sigsa7_reviews;

USE sigsa7_reviews;

CREATE TABLE IF NOT EXISTS restaurants (
  id bigserial PRIMARY KEY,
  restaurantName varchar(100) NOT NULL,
  neighborhood varchar(100) NOT NULL,
  keywords text[],
  avgOverall real DEFAULT 0.0,
  avgFood real DEFAULT 0.0,
  avgService real DEFAULT 0.0,
  avgAmbience real DEFAULT 0.0,
  avgNoise real DEFAULT 0.0,
  avgRecommend real DEFAULT 0.0,
);

CREATE TABLE IF NOT EXISTS users (
  id bigserial PRIMARY KEY,
  userName varchar(100) NOT NULL,
  userLocation varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
  id bigserial NOT NULL PRIMARY KEY,
  restaurantId bigserial REFERENCES restaurantName(id),
  userId bigserial REFERENCES users(id),
  foodRating smallint NOT NULL,
  serviceRating smallint NOT NULL,
  ambienceRating smallint NOT NULL,
  valueRating smallint NOT NULL,
  helpfulCount smallint DEFAULT 0,
  reviewDate timestamp [(p)] [without time zone],
  noise smallint NOT NULL,
  recommended boolean NOT NULL,
  reviewText varchar(1000) NOT NULL
);
