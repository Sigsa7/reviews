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

  const query = {
    name: 'create-new-review',
    text: `
      INSERT INTO reviews (restaurantId, userId, foodRating, serviceRating, ambienceRating, valueRating, reviewDate, noise, recommended, reviewText)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
    values: [
      restaurantId,
      userId,
      foodRating,
      serviceRating,
      ambienceRating,
      valueRating,
      reviewDate,
      noise,
      recommended,
      reviewText,
    ],
  };

  try {
    const data = pg.query(query);
    res.status(201).json(data.rows);
  } catch (e) {
    res.status(500).json(e);
  }

};

module.exports = createReivews;
