const pg = require('../db');

const createReivews = (req, res) => {
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

  pg.query(query, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(data.rows);
    }
  });

};

module.exports = createReivews;
