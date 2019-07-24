# Restaurant Reviews module

## CRUD APIs:

### Create (POST)

This method create one review record to the database.

`POST /:restaurantId/reviews`

#### Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| ----------------------------------------------------------------------:|
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
| ---------------- |:-------------:| ----------------------------------------------------------------------:|
| `restaurantId`   | `integer`     | *Required.* Restaurant identifier for the targeted restaruant.         |
| `sort`           | `string`      | Sorts the results of your query by ascending `post date`, or decending |
|                  |               | rating, or decending rating. Default: descending `post date`.          |
| `keyword`        | `string`      | Filter reviews of the restaurant by keyword(s).                        |
| `star`           | `integer`     | Filter reviews of the restaurant by star(s).                           |

### Update (PUT)

Update one review record in the database.

`PUT /:restaurantId/:reviewId`

#### Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| ----------------------------------------------------------------------:|
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
| ---------------- |:-------------:| ----------------------------------------------------------------------:|
| `reviewId    `   | `integer`     | *Required.* Review identifier for the targeted review to be deleted.   |
