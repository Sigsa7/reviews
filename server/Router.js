const express = require('express');
const createReviews = require('./Models/createReviews');
const getRestaurantInfo = require('./Models/getRestaurantInfo');
const getRestaurantReviewLisitng = require('./Models/getRestaurantReviewLisitng');
const updateReview = require('./Models/updateReview');
const deleteReview = require('./Models/deleteReview');

const router = express.Router();

router.post('/:restaurantId/reviews', createReviews);
router.get('/:restaurantId/reviews/reviewListing', getRestaurantReviewLisitng);
router.get('/:restaurantId/reviews/restaurantInfo', getRestaurantInfo);
router.patch('/:restaurantId/reviews/:reviewId', updateReview);
router.delete('/:restaurantId/reviews/:reviewId', deleteReview);

module.exports = router;
