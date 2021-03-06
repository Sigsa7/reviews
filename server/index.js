const newrelic = require('newrelic');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');
const router = require('./Router.js');
const morgan = require('morgan');

const app = express();

const db = require('./db/index.js');

app.use(express.json());
app.set('port', 3004);

app.get(`/${process.env.LOADERIO}`, (req, res) => {
  res.status(200).send(`${process.env.LOADERIO}`);
});

app.get('/payload', (req, res) => {
  res.status(200).sendFile('/home/ec2-user/reviews/generatePayload.json');
});

app.use('/', expressStaticGzip(path.join(__dirname, '../client/dist'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz']
 }));

app.use('/:restaurantID', expressStaticGzip(path.join(__dirname, '../client/dist'), {
enableBrotli: true,
orderPreference: ['br', 'gz']
}));

app.use('/', router);

app.listen(app.get('port'));
console.log(`Now listening to port ${app.get('port')}`);
