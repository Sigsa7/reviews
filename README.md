# Restaurant Reviews module

What are your service's inputs and outputs (API Spec)?

`GET /:restaurantID/reviews`

`GET /:restaurantID/reviews?filter=[stars]`

`GET /:restaurantID/reviews?sort=[newest, highest rating, lowest rating]`

`GET /:restaurantID/reviews?filter=[keywords]`


**Input**: `restaurantID` identifies which restaurant to get reviews from
          - filter and sort parameters identifying what order to display reviews in

**Output**: Upon module initialization, output will be JSON of all reviews and restaurant specific information
            Upon additional sorting and filtering, output will be JSON of all reviews only.

```
{
  restaurantID: INTEGER,
  reviewID: INTEGER,
  userName: STRING,
  userLocation: STRING,
  userTotalReviews: INTEGER,
  reviewDate: DATE,
  reviewOverallRating: INTEGER,
  reviewFoodRating: INTEGER,
  reviewServiceRating: INTEGER,
  reviewAmbienceRating: INTEGER,
  reviewValueRating: INTEGER,
  reviewHelpfulCount: INTEGER,
  reviewNoise: STRING,
  reviewRecommend: BOOLEAN,
  reviewBody: STRING,
  restaurantTotalReviews: INTEGER,
  avgOverallRating: INTEGER,
  avgFoodRating: INTEGER,
  avgServiceRating: INTEGER,
  avgAmbienceRating: INTEGER,
  avgNoiseRating: INTEGER,
  avgRecRating: INTEGER,
  keywords: STRING,
  neighborhood: STRING
}

{
  restaurantID: INTEGER,
  reviewID: INTEGER,
  userName: STRING,
  userLocation: STRING,
  userTotalReviews: INTEGER,
  reviewDate: DATE,
  reviewOverallRating: INTEGER,
  reviewFoodRating: INTEGER,
  reviewServiceRating: INTEGER,
  reviewAmbienceRating: INTEGER,
  reviewValueRating: INTEGER,
  reviewHelpfulCount: INTEGER,
  reviewNoise: STRING,
  reviewRecommend: BOOLEAN,
  reviewBody: STRING,
}
```

### Bare Minimum Requirements:

- Upon module initialization get current restaurant reviews from the database
- Create reviews summary section
- Create individual reviews section
- Create buttons as needed to filter and sort the reviews
- Create buttons at bottom of individual reviews to "report" review or increase "helpful" count.

### Stretch Goals:

- Build out page that allows person to write a review.

### Data Schema:
I chose to use MySQL for my database because it is easily scalable. MongoDB is the better choice if we are scaling horizontally (e.g. more review options), but since our topics are pretty well defined, MySQL is a better choice.

