const { Pool } = require('pg');

const connectionStr = {
  host: '13.57.3.155', // server name or IP address;
  // port: 5432,
  database: 'sigsa7_reviews',
  user: 'ec2_user',
  password: 'password',
};

const pool = new Pool(connectionStr);

pool.connect();

module.exports = pool;
