const pg = require('../db');

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

  try {
    const data = pg.query(query);
    res.status(201).json(data.rows);
  } catch (e) {
    res.status(500).json(e);
  }

}

module.exports = updateReview;
