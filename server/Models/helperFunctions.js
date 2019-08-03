module.exports.generateReviewListingQuery = (restaurantId, sort, keywords, star) => {

  const selections = 'foodrating, servicerating, ambiencerating, valuerating, helpfulCount, reviewdate, noise, reviewtext';

  let comma = '';
  let orderByStr = '';
  let sortDirection = '';
  let keywordStr = '';
  let starStr = '';

  if (sort !== undefined && sort !== '') {
    comma = ',';
    orderByStr = 'avgrating';
  }

  if (sort === 'highest rating') {
    sortDirection = 'DESC,';
  } else if (sort === 'lowest rating') {
    sortDirection = 'ASC,';
  }

  if (keywords!== undefined && keywords.length !== 0) {
    for (let i = 0; i < keywords.length; i ++) {
      keywordStr += `AND reviews.reviewText LIKE '%${keywords[i]}%' `;
    }

    keywordStr = keywordStr.trim();
  }

  if (star !== undefined && star !== 0) {
    starStr = `AND avgrating >= ${star} AND avgrating < ${star + 1}`;
  }

  const queryReviews = {
    text: `
      SELECT ${selections} ${comma} ${orderByStr} FROM reviews
        INNER JOIN users
          ON users.id=reviews.userid
        WHERE
          reviews.restaurantid=${restaurantId}
          ${keywordStr}
          ${starStr}
        ORDER BY
          ${orderByStr} ${sortDirection}
          reviews.reviewdate DESC
        LIMIT 10;
    `,
  };

  return queryReviews;
};

module.exports.generateRestaurantInfoQuery = (restaurantId) => {
  const queryInfo = {
    text: `
      SELECT * FROM restaurants
        WHERE
          restaurants.id=${restaurantId};
    `,
  };

  return queryInfo;
};
