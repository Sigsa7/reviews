-- CREATE A REVIEW

EXPLAIN ANALYZE
INSERT INTO reviews (restaurantId, userId, foodRating, serviceRating, ambienceRating, valueRating, reviewDate, noise, recommended, reviewText) VALUES
  (1, 1, 1, 2, 3, 4, 1564195654, 4, false, 'adaredugjbw awsidujvmvw. weioknwef asdicowlefj.')
RETURNING id;

-- GET THE INFO AND REVIEWS FOR A RESTAURANT SORT BY POST DATE

EXPLAIN ANALYZE
SELECT * FROM restaurants
  INNER JOIN reviews
    ON restaurants.id=reviews.restaurantid
  WHERE restaurants.id=9999
  ORDER BY reviews.reviewdate DESC;

-- GET THE INFO AND REVIEWS FOR A RESTAURANT WITH OTHER SORTING CRITERIAS
SELECT *, CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4 AS avg_overal_from_reviews
FROM restaurants
        INNER JOIN reviews
          ON restaurants.id=reviews.restaurantid
        WHERE restaurants.id=999999
        ORDER BY
CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4 ASC, reviews.reviewdate DESC;

-- GET THE REIVEWS FOR A RESTAURANT BASED ON RESTAURANT ID SORT BY POST DATE

EXPLAIN ANALYZE
SELECT * FROM reviews
  WHERE restaurantId=893949
  ORDER BY reviewDate DESC;

-- UPDATE A REVIEW'S HELPFUL COUNT
EXPLAIN ANALYZE
UPDATE reviews
  SET helpfulCount = helpfulCount + 1
WHERE
  id=893949;

-- DELETE A REVIEW
EXPLAIN ANALYZE
DELETE FROM reviews
  WHERE id=FILL_ME_IN;
