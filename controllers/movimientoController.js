// /controllers/movementController.js
const movimientoService = require('../services/movimientoService');

const getAllMovements = async (req, res) => {
  try {
    const movements = await movimientoService.getMovimientos();
    res.json(movements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controlador para crear un nuevo movimiento
const createMovement = async (req, res) => {
  const { Descripcion, TipoMovimiento, FechaMovimiento, Monto, Categoria, Recurrente, Medio } = req.body;
  console.log(req.body);
  try {
    const newMovement = await movimientoService.createMovimiento(Descripcion, TipoMovimiento, Monto, Categoria, Recurrente, Medio, FechaMovimiento);
    res.status(201).json(newMovement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controlador para actualizar un movimiento
const updateMovement = async (req, res) => {
  const { id, descripcion, tipo, monto, categoria, recurrente, medio } = req.body;
  try {
    const updatedMovement = await movimientoService.updateMovimiento(id, descripcion, tipo, monto, categoria, recurrente, medio);
    res.json(updatedMovement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controlador para eliminar un movimiento
const deleteMovement = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedMovement = await movimientoService.deleteMovimiento(id);
    res.json(deletedMovement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllMovements, createMovement, updateMovement, deleteMovement };
