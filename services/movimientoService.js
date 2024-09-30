const { pool } = require('../db/db');

// Función para obtener todos los gastos
const getMovimientos = async () => {
  const query = `
    SELECT * 
    FROM movimientos
    WHERE EXTRACT(MONTH FROM Fecha) = EXTRACT(MONTH FROM CURRENT_DATE)
      AND EXTRACT(YEAR FROM Fecha) = EXTRACT(YEAR FROM CURRENT_DATE);
  `;

  try {
    const res = await pool.query(query);
    return res.rows; // Devuelve solo los movimientos del mes actual
  } catch (err) {
    throw new Error(`Error getting movements: ${err.message}`);
  }
};

// Función para crear un nuevo gasto
const createMovimiento = async (
  descripcion,
  tipo,
  monto,
  categoria,
  recurrente,
  medio,
  fecha
) => {
  const query = `
    INSERT INTO movimientos (Descripcion, TipoMovimiento, Monto, Categoria, Recurrente, MedioPago, Fecha)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [descripcion, tipo, monto, categoria, recurrente, medio, fecha];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];  // Devuelve el movimiento insertado
  } catch (err) {
    console.error('Error al crear movimiento:', err);
    throw err;
  }
};

// Función para actualizar un gasto
const updateMovimiento = async (
  id,
  descripcion,
  tipo,
  monto,
  categoria,
  recurrente,
  medio
) => {
  try {
    const res = await pool.query(
      'UPDATE movimientos SET descripcion = $1, tipo = $2, monto = $3, categoria = $4, recurrente = $5, medio = $6 WHERE id = $7 RETURNING *',
      [descripcion, tipo, monto, categoria, recurrente, medio, id]
    );
    return res.rows[0];
  } catch (err) {
    throw new Error(`Error updating movement: ${err.message}`);
  }
};

// Función para eliminar un gasto
const deleteMovimiento = async (id) => {
  try {
    const res = await pool.query(
      'DELETE FROM movimientos WHERE id = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw new Error(`Error deleting movement: ${err.message}`);
  }
};

const getGastosPorCategoria = async () => {
  const query = `
    SELECT Categoria, SUM(Monto) AS total, MAX(Fecha) AS fecha
    FROM movimientos
    WHERE TipoMovimiento = 'Egreso'
    GROUP BY Categoria;
  `;

  try {
    const res = await pool.query(query);
    return res.rows; // Devuelve la lista de categorías con el total de gastos
  } catch (err) {
    throw new Error(`Error getting expenses by category: ${err.message}`);
  }
};

module.exports = {
  getMovimientos,
  createMovimiento,
  updateMovimiento,
  deleteMovimiento,
  getGastosPorCategoria,
};
