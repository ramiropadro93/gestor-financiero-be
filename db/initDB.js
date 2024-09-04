// /db/initDB.js
const db = require('./db'); // Asegúrate de que este archivo esté exportando el cliente de PostgreSQL

const createTables = async () => {
  try {
    await db.query(`
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

createTables();
