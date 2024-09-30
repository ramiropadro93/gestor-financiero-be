// /controllers/movementController.js
const movimientoService = require('../services/movimientoService');
const PDFDocument = require('pdfkit');

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
    const {
        Descripcion,
        TipoMovimiento,
        FechaMovimiento,
        Monto,
        Categoria,
        Recurrente,
        Medio,
    } = req.body;
    console.log(req.body);
    try {
        const newMovement = await movimientoService.createMovimiento(
            Descripcion,
            TipoMovimiento,
            Monto,
            Categoria,
            Recurrente,
            Medio,
            FechaMovimiento
        );
        res.status(201).json(newMovement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controlador para actualizar un movimiento
const updateMovement = async (req, res) => {
    const { id, descripcion, tipo, monto, categoria, recurrente, medio } =
        req.body;
    try {
        const updatedMovement = await movimientoService.updateMovimiento(
            id,
            descripcion,
            tipo,
            monto,
            categoria,
            recurrente,
            medio
        );
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

// Controlador para obtener los gastos por categoría
const getGastosPorCategoria = async (req, res) => {
    try {
        const gastosPorCategoria =
            await movimientoService.getGastosPorCategoria();
        res.json(gastosPorCategoria);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getGastosPorCategoriaPDF = async (req, res) => {
    try {
        const gastosPorCategoria =
            await movimientoService.getGastosPorCategoria();
        const fechaPrimerMovimiento = new Date(gastosPorCategoria[0].fecha);
        const nombreMes = fechaPrimerMovimiento.toLocaleString('es-ES', {
            month: 'long',
        });

        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="reporte-gastos-${nombreMes}.pdf"`
        );

        doc.pipe(res);

        doc.fontSize(20).text(
            `Reporte de gastos por categoría del mes de ${nombreMes}`,
            { align: 'center' }
        );
        doc.moveDown();

        let totalGastos = 0;

        gastosPorCategoria.forEach((item) => {
            const monto = parseFloat(item.total);
            totalGastos += monto;
            doc.fontSize(14).text(`${item.categoria}: $${monto.toFixed(2)}`);
        });

        doc.moveDown();

        doc.fontSize(16).text(`Total: $${totalGastos.toFixed(2)}`, {
            align: 'right',
        });

        doc.end();
    } catch (err) {
        console.error('Error al generar el PDF:', err.message);
        res.status(500).json({ error: 'Error al generar el reporte PDF' });
    }
};

module.exports = {
    getAllMovements,
    createMovement,
    updateMovement,
    deleteMovement,
    getGastosPorCategoriaPDF,
};
