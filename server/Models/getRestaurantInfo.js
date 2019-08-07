const pg = require('../db');
const redis = require('../db/redisConnection');
const { generateRestaurantInfoQuery, generateReviewListingQuery } = require('./helperFunctions');

const getRestaurantInfo = async (req, res) => {
  const { restaurantId } = req.params;

  const queryInfo = generateRestaurantInfoQuery(restaurantId);
  const queryReviews = generateReviewListingQuery(restaurantId);

  return redis.get(queryInfo.text, async (err, infoResult) => {
    if (infoResult) {
      try {
        const restaurantInfo = JSON.parse(infoResult);

        redis.get(queryReviews.text, async (err, reviewsResult) => {
          try {
            let reviews;
            if (reviewsResult) {
              console.log('from cache restInfo')
              reviews = JSON.parse(reviewsResult);
            } else {
              reviews = await pg.query(queryReviews);
              redis.setex(queryReviews.text, 1800, JSON.stringify(reviews));
            }

            const data = {
              restaurantInfo: restaurantInfo.rows,
              reviews: reviews.rows,
            };
            return res.status(200).json(data);
          } catch (e) {
            return res.status(500).json(e);
          }
        });
      } catch (e) {
        return res.status(500).json(e);
      }

    } else {
      try {
        const restaurantInfo = await pg.query(queryInfo);
        const reviews = await pg.query(queryReviews);
        redis.setex(queryInfo.text, 1800, JSON.stringify(restaurantInfo));
        redis.setex(queryReviews.text, 1800, JSON.stringify(reviews));

        const data = {
          restaurantInfo: restaurantInfo.rows,
          reviews: reviews.rows,
        };

        return res.status(200).json(data);

      } catch (e) {
        return res.status(500).json(e);
      }
    }
  });
};

module.exports = getRestaurantInfo;
