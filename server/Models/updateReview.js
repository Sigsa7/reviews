const db = require('../db');

const updateReview = (req, res) => {
  const { restaurantId, reviewId } = req.params;

  const query = {
    name: 'update-a-review',
    text: `
      UPDATE reviews
        SET helpfulCount = helpfulCount + 1
      WHERE
        id=$1
        AND
        restaurantid=$2;
    `,
    values: [ reviewId, restaurantId ],
  };

  db.query(query, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      console.log(data.rows);
      res.status(201).json(data.rows);
    }
  });
}

module.exports = updateReview;
