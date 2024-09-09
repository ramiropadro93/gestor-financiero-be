// /db/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'shenron93',
  host: 'dpg-crfinm2j1k6c73dn9o8g-a',
  database: 'gestor_pg55',
  password: 'XJUpl3APR0gCMxN39ilHAapihMTu2WN5',
  port: 5432,
});

module.exports = pool;
