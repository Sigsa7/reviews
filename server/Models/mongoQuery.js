// Create a review for a restaurant
db.reviews.create({
  restaurantid: 1,
  userid: 1,
  foodrating: 2,
  servicerating: 4,
  ambiencerating: 5,
  valuerating: 5,
  noise: 8,
  recommended: 0.6,
  reviewdate: 1564523302,
  reviewtext: 'delete me!!',
});

// Get restaurant info
db.reviews.explain('executionStats').aggregate([
  {
    $lookup: {
      from: 'restaurants',
      localField: 'restaurantid',
      foreignField: 'restaurantId',
      as: 'restaurants',
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'userid',
      foreignField: 'userId',
      as: 'users',
    }
  },
  {
    $match:{
      $and:[{"restaurantid" : 9999999}]
    }
  }
]).limit(10);

// Patch helpful count
db.reviews.update(
  { _id: ObjectId('') },
  { $inc: { helpfulCount: 1 } }
);

// delete a review
db.reviews.delete({ _id: ObjectId('') });