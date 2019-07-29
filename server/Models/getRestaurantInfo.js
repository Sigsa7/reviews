const pg = require('../db');

const getRestaurantInfo = (req, res) => {
  const { restaurantId } = req.params;

  const { sort } = req.body;
  let orderByStr = '';
  let selectStr;
  let sortDirection = 'DESC';

  if (sort === 'highest rating') {
    orderByStr = 'CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4';
  }

  if (sort === 'lowest rating') {
    orderByStr = 'CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4';
    sortDirection = 'ASC'
  }

  if (orderByStr !== '') {
    selectStr = orderByStr + ' AS avg_overal_from_reviews';
    console.log(selectStr)
  }

  const query = {
    name: 'get-restaurant-info',
    text: `
      SELECT *, ${selectStr} FROM restaurants
        INNER JOIN reviews
          ON restaurants.id=reviews.restaurantid
        WHERE restaurants.id=$1
        ORDER BY
          ${orderByStr} ${sortDirection},
          reviews.reviewdate DESC
        LIMIT 10;
    `,
    values: [ restaurantId ],
  };

  pg.query(query, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(data.rows);
    }
  });
};

module.exports = getRestaurantInfo;
