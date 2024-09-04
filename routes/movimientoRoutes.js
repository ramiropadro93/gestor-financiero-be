// /routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimientoController');

router.get('/get', movimientoController.getAllMovements);
router.post('/create', movimientoController.createMovement);
router.put('/update', movimientoController.updateMovement);
router.delete('/delete', movimientoController.deleteMovement);

module.exports = router;
