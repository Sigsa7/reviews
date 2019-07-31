const db = require('../db');

const deleteReview = (req, res) => {
  const { reviewId } = req.params;

  const query = {
    name: 'delete-a-review',
    text: `
      DELETE FROM reviews
        WHERE
          id=$1;
    `,
    values: [ reviewId ],
  };

  db.query(query, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(data);
    }
  });
}

module.exports = deleteReview;
