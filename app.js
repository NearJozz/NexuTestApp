// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const carRoutes = require('./routes/carRoutes');
const cors = require('cors')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors())
// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Rutas
app.use('/', carRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
