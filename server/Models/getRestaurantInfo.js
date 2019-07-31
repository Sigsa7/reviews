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

  if (star !== undefined) {
    starStr = `AND CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4 >= ${star} AND CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4 < ${star + 1}`;
  }

  const query = {
    text: `
      SELECT *${selectStr} FROM restaurants
        INNER JOIN reviews
          ON restaurants.id=reviews.restaurantid
        INNER JOIN users
          ON users.id=reviews.userid
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

  SELECT *, CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4 FROM restaurants
  INNER JOIN reviews
    ON restaurants.id=reviews.restaurantid
  INNER JOIN users
    ON users.id=reviews.userid
  WHERE
    restaurants.id=999999
  AND reviews.reviewText LIKE '%et%'
  AND CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4 >= 2 AND CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4 < 3
  ORDER BY
    CAST((reviews.foodrating+reviews.servicerating+reviews.ambiencerating+reviews.valuerating) AS FLOAT)/4 DESC,
    reviews.reviewdate DESC
  LIMIT 10;

  console.log(query.text)

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
