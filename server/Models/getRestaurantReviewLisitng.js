const pg = require('../db');
const redis = require('../db/redisConnection');
const { generateReviewListingQuery } = require('./helperFunctions');

const getRestaurantReviewListing = async (req, res) => {
  const { restaurantId } = req.params;
  const { sort, keywords, star } = req.query;

  const query = generateReviewListingQuery(restaurantId, sort, keywords, star);

  return redis.get(query.text, async (err, result) => {
    if (result) {
      console.log('from cache reviewList')
      const jsonResult = JSON.parse(result);
      return res.status(200).json(jsonResult.rows);

    } else {
      try {
        const data = await pg.query(query);
        redis.setex(query.text, 1800, JSON.stringify(data));
        return res.status(200).json(data.rows);
      } catch (e) {
        return res.status(500).json(e);
      }
    }
  });
};

module.exports = getRestaurantReviewListing;
