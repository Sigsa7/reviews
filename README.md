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

### Create (POST)

This method create one review record to the database.

`POST /:restaurantId/reviews`

#### Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `userId`         | `integer`     | *Required.* User identifier.                                           |
| `restaurantId`   | `integer`     | *Required.* Restaurant identifier for the reviewed restaruant.         |
| `foodRating`     | `integer`     | *Required.* Food rating score for the reviewed restaurant.             |
| `serviceRating`  | `integer`     | *Required.* Service rating score for the reviewed restaurant.          |
| `ambienceRating` | `integer`     | *Required.* Ambience rating score for the reviewed restaurant.         |
| `valueRating`    | `integer`     | *Required.* Value rating score for the reviewed restaurant.            |
| `noise`          | `integer`     | *Required.* Noise rating score for the reviewed restaurant.            |
| `recommend`      | `boolean`     | *Required.* Whether or not the user recommend the reviewed restaurant. |
| `text`           | `string`      | *Required.* The review description.                                    |


### Read (GET)

Find reviews via various criteria. This method returns up to 10 results per request.

`GET /:restaurantId/reviews`

#### Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `restaurantId`   | `integer`     | *Required.* Restaurant identifier for the targeted restaruant.         |
| `sort`           | `string`      | Sorts the results of your query by ascending `post date`, or decending<br>`overall rating`, or decending `overall rating`. <br>Default: descending `post date`.          |
| `keyword`        | `string`      | Filter reviews of the restaurant by keyword(s).                        |
| `star`           | `integer`     | Filter reviews of the restaurant by star(s).                           |

### Update (PUT)

Update one review record in the database.

`PUT /:restaurantId/:reviewId`

#### Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `reviewId    `   | `integer`     | *Required.* Review identifier for the targeted review to be updated.   |
| `foodRating`     | `integer`     |  Food rating score for the reviewed restaurant.                        |
| `serviceRating`  | `integer`     |  Service rating score for the reviewed restaurant.                     |
| `ambienceRating` | `integer`     |  Ambience rating score for the reviewed restaurant.                    |
| `valueRating`    | `integer`     |  Value rating score for the reviewed restaurant.                       |
| `noise`          | `integer`     |  Noise rating score for the reviewed restaurant.                       |
| `recommend`      | `boolean`     |  Whether or not the user recommend the reviewed restaurant.            |
| `text`           | `string`      |  The review description.                                               |

### Delete (DELETE)

Delete one review record from the database.

`DELETE /:restaurantId/:reviewId`

#### Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `reviewId    `   | `integer`     | *Required.* Review identifier for the targeted review to be deleted.   |
