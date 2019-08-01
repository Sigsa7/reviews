const pg = require('../db');

const getRestaurantInfo = (req, res) => {
  const { restaurantId } = req.params;

  const { sort, keywords, star } = req.body;
  let orderByStr = '';
  let selectStr = orderByStr;
  let sortDirection = '';
  let keywordStr = '';
  let starStr = '';

  if (sort === 'highest rating') {
    orderByStr = ', CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4  AS avg_overal_from_reviews';
    sortDirection = ' DESC,';
  }

  if (sort === 'lowest rating') {
    orderByStr = ', CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4 AS avg_overal_from_reviews';
    sortDirection = ' ASC,';
  }

  if (keywords.length !== 0) {
    for (let i = 0; i < keywords.length; i ++) {
      keywordStr += `AND reviews.reviewText LIKE '%${keywords[i]}%' `;
    }

    keywordStr = keywordStr.trim();
  }

  if (orderByStr !== '') {
    selectStr = 'avg_overal_from_reviews';
  }

  if (star !== 0) {
    starStr = `AND CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4 >= ${star} AND CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4 < ${star + 1}`;
  }

  const query = {
    text: `
      SELECT *${orderByStr} FROM restaurants
        INNER JOIN reviews
          ON restaurants.id=reviews.restaurantid
        INNER JOIN users
          ON users.id=reviews.userid
        WHERE
          restaurants.id=$1
          ${keywordStr}
          ${starStr}
        ORDER BY
          ${selectStr} ${sortDirection}
          reviews.reviewdate DESC
        LIMIT 10;
    `,
    values: [ restaurantId ],
  };

  pg.query(query, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data.rows);
    }
  });
};

module.exports = getRestaurantInfo;
