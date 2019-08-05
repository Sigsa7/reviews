const { Pool } = require('pg');

const connectionStr = {
  host: 'ec2-13-57-3-155.us-west-1.compute.amazonaws.com', // server name or IP address;
  port: 5432,
  database: 'sigsa7_reviews',
  user: 'ec2-user',
  password: '',
};

const pool = new Pool(connectionStr);

pool.connect();

module.exports = pool;
