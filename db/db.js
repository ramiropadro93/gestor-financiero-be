// /db/db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.connect((err, client, release) => {
  console.log('Connecting to PostgreSQL database');
  console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
});

module.exports = pool;
