const newrelic = require('newrelic');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');
const router = require('./Router.js');
const morgan = require('morgan');

const app = express();

const db = require('./db/index.js');

app.use(morgan('dev'));
app.use(express.json());
app.set('port', 3004);

app.use('/', expressStaticGzip(path.join(__dirname, '../client/dist'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz']
 }));

app.use('/:restaurantID', expressStaticGzip(path.join(__dirname, '../client/dist'), {
enableBrotli: true,
orderPreference: ['br', 'gz']
}));

app.get('/loaderio-bc5ce11e94267dcc5ea0be046c5b74a0', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '..', 'loaderio-bc5ce11e94267dcc5ea0be046c5b74a0.txt'));
});

app.use('/', router);

app.listen(app.get('port'));
console.log(`Now listening to port ${app.get('port')}`);
