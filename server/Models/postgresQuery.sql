-- CREATE A REVIEW

EXPLAIN ANALYZE
INSERT INTO reviews (restaurantId, userId, foodRating, serviceRating, ambienceRating, valueRating, reviewDate, noise, recommended, reviewText) VALUES
  (1, 1, 1, 2, 3, 4, 1564195654, 4, false, 'adaredugjbw awsidujvmvw. weioknwef asdicowlefj.')
RETURNING id;

-- GET THE REIVEWS FOR A RESTAURANT BASED ON RESTAURANT ID SORT BY POST DATE

EXPLAIN ANALYZE
SELECT * FROM reviews
  WHERE restaurantId=893949
  ORDER BY reviewDate DESC;

-- GET THE INFO FOR A RESTAURANT

EXPLAIN ANALYZE
SELECT * FROM restaurants
  WHERE restaurantId=893949;

-- UPDATE A REVIEW'S HELPFUL COUNT

UPDATE reviews
  SET helpfulCount = helpfulCount + 1
WHERE
  id=893949;

-- DELETE A REVIEW
EXPLAIN ANALYZE
DELETE FROM reviews
  WHERE id=FILL_ME_IN;
