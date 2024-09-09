// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const movimientoRoutes = require('./routes/movimientoRoutes');
const { createTables } = require('./db/db');

const app = express();
const port = 4001;

createTables();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/movimientos', movimientoRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
