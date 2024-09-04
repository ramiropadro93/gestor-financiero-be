// /db/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gestor-financiero',
  password: '38050222',
  port: 5432,
});

module.exports = pool;
