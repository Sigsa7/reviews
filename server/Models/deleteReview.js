const db = require('../db');

const deleteReview = (req, res) => {
  const { restaurantId, reviewId } = req.params;

  const query = {
    name: 'delete-a-review',
    text: `
      DELETE FROM reviews
        WHERE
          restaurantid=$1
          AND
          id=$2
    `,
    values: [ restaurantId, reviewId ],
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

module.exports = deleteReview;
