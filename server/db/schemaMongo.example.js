const restaurants = [
  {
    restaurantId: integer (1 - 10000000)
    restaurantName: '',
    neighborhood: '',
    keywords: [],
    avgOverall: real,
    avgFood: real,
    avgService: real,
    avgAmbience: real,
    avgValue: real,
    avgNoise: real,
    avgRecommend: real,
  }
];

const reviews = [
  {
    restaurantId: bigserial,
    userId: serial,
    foodRating: smallint,
    serviceRating: smallint,
    ambienceRating: smallint,
    valueRating: smallint,
    helpfulCount: smallint DEFAULT 0,
    reviewDate: int,
    noise: smallint,
    recommended: boolean,
    reviewText: varchar(1000),
  }
];

const users = [
  {
    userId: integer,
    userName: '',
    location: '',
  }
]