const { Pool } = require('pg');

const connectionStr = {
  host: 'localhost', // server name or IP address;
  port: 5432,
  database: 'sigsa7_reviews',
  user: 'jenniezeng',
  password: '',
};

const pool = new Pool(connectionStr);

pool.connect();

module.exports = pool;
