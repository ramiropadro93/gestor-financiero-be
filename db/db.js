const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://shenron93:XJUpl3APR0gCMxN39ilHAapihMTu2WN5@dpg-crfinm2j1k6c73dn9o8g-a.oregon-postgres.render.com/gestor_pg55',
  ssl: {
    rejectUnauthorized: false, 
  },
});

const createTables = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS Movimientos (
        Id SERIAL PRIMARY KEY,
        Descripcion VARCHAR(255) NOT NULL,
        TipoMovimiento VARCHAR(255) NOT NULL,
        Fecha DATE NOT NULL,
        Monto DECIMAL(10, 2) NOT NULL,
        Categoria VARCHAR(100),
        Recurrente BOOLEAN DEFAULT FALSE,
        MedioPago VARCHAR(100)
      );
    `);
        console.log('Tables created');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
};

module.exports = {
    pool,
    createTables,
};
