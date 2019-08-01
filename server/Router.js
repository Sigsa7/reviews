const express = require('express');
const createReviews = require('./Models/createReviews');
const getRestaurantInfo = require('./Models/getRestaurantInfo');
const updateReview = require('./Models/updateReview');
const deleteReview = require('./Models/deleteReview');

const router = express.Router();

router.post('/:restaurantId/reviews', createReviews);
router.get('/:restaurantId/reviews', getRestaurantInfo);
router.patch('/:restaurantId/:reviewId', updateReview);
router.delete('/:restaurantId/:reviewId', deleteReview);

module.exports = router;
