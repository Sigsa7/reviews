# Restaurant Reviews module

## CRUD APIs:

Request body is accepted as JSON format.

### Create (POST)

This method create one review record to the database.

`POST /:restaurantId/reviews`

#### Body

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
| `keyword`        | `array `      | Filter reviews of the restaurant by keyword(s).                        |
| `star`           | `integer`     | Filter reviews of the restaurant by star(s).                           |

### Response

| Name               | Type         | Description                                                            |
| ------------------ |:------------:| :----------------------------------------------------------------------|
| `neighborhood`     | `string`     | Neighborhood of the restaurant                                         |
| `keywords`         | `array`      | Keywords associate with the restaurant                                 |
| `avgOverallRating` | `float`      | An average overall rating of the restaurant from all the reviews       |
| `avgFoodRating`    | `float`      | An average food rating of the restaurant from all the reviews          |
| `avgServiceRating` | `float`      | An average service rating of the restaurant from all the reviews       |
| `avgAmbienceRating`| `float`      | An average ambience rating of the restaurant from all the reviews      |
| `avgNoise`         | `float`      | An average noise rating of the restaurant from all the reviews         |
| `avgRecommend`     | `float`      | The average recommendation rate of the restaurant from all the reviews |

### Update (PATCH)

Update one review's helpful count in the database.

`PATCH /:restaurantId/:reviewId`

#### Parameter

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `reviewId    `   | `integer`     | *Required.* Review identifier for the targeted review to be updated.   |

### Delete (DELETE)

Delete one review record from the database.

`DELETE /:restaurantId/:reviewId`

#### Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `reviewId    `   | `integer`     | *Required.* Review identifier for the targeted review to be deleted.   |
