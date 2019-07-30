const pg = require('../db');

const getRestaurantInfo = (req, res) => {
  const { restaurantId } = req.params;

  const { sort, keyword, star } = req.body;
  let orderByStr = '';
  let selectStr = orderByStr;
  let sortDirection = '';
  let keywordStr = '';
  let starStr = '';

  if (sort === 'highest rating') {
    orderByStr = 'CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4';
    sortDirection = ' DESC,';
  }

  if (sort === 'lowest rating') {
    orderByStr = 'CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4';
    sortDirection = ' ASC,';
  }

  if (keyword !== undefined) {
    for (let i = 0; i < keyword.length; i ++) {
      keywordStr += `AND reviews.reviewText LIKE '%${keyword[i]}%' `;
    }

    keywordStr = keywordStr.slice(0, -1);
  }

  if (orderByStr !== '') {
    selectStr = ', ' + orderByStr + ' AS avg_overal_from_reviews';
  }

  if (star !== '') {
    starStr = `AND CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4 >= ${star} AND CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4 < ${star + 1}`;
  }

  const query = {
    text: `
      SELECT *${selectStr} FROM restaurants
        INNER JOIN reviews
          ON restaurants.id=reviews.restaurantid
        WHERE
          restaurants.id=$1
          ${keywordStr}
          ${starStr}
        ORDER BY
          ${orderByStr} ${sortDirection}
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
