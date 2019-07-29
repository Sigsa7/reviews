const express = require('express');
const createReviews = require('./Models/createReviews');

const router = express.Router();

router.post('/:restaurantId/reviews', createReviews);


module.exports = router;