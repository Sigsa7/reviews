const pg = require('../db');

const deleteReview = async (req, res) => {
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

  try {
    const data = pg.query(query);
    res.status(201).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
}

module.exports = deleteReview;
