const db = require('../db');

const updateReview = (req, res) => {
  const { reviewId } = req.params;

  const query = {
    name: 'update-a-review',
    text: `
      UPDATE reviews
        SET helpfulCount = helpfulCount + 1
      WHERE
        id=$1
      RETURNING *;
    `,
    values: [ reviewId ],
  };

  db.query(query, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(data.rows);
    }
  });
}

module.exports = updateReview;
