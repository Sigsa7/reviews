const pg = require('../db');

const createReivews = async (req, res) => {
  const { restaurantId } = req.params;

  const {
    userId,
    foodRating,
    serviceRating,
    ambienceRating,
    valueRating,
    reviewDate,
    noise,
    recommended,
    reviewText,
  } = req.body;

  const avgrating = (foodRating + serviceRating + ambienceRating + valueRating) / 4;

  const query = {
    name: 'create-new-review',
    text: `
      INSERT INTO reviews (restaurantId, userId, foodRating, serviceRating, ambienceRating, valueRating, avgrating, reviewDate, noise, recommended, reviewText)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
    values: [
      restaurantId,
      userId,
      foodRating,
      serviceRating,
      ambienceRating,
      valueRating,
      avgrating,
      reviewDate,
      noise,
      recommended,
      reviewText,
    ],
  };

  try {
    pg.query(query);
    res.status(201).json('Posted');
  } catch (e) {
    console.log(e)
    res.status(500).json(e);
  }

};

module.exports = createReivews;
