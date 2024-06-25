// initData.js
const mongoose = require('mongoose');
const fs = require('fs');
const Car=require('./models/car.js')
const Brand=require('./models/brand.js')
require('dotenv').config();


// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI);

fs.readFile('data.json', 'utf8', async (err, data) => {
  if (err) {
      console.error('Error leyendo archivo:', err);
      return;
  }

  try {
      const models = JSON.parse(data);

      // Obtener nombres de marcas únicas
      const brandNames = [...new Set(models.map(model => model.brand_name))];

      // Insertar marcas
      const brands = await Brand.insertMany(brandNames.map(name => ({ name })));

      // Insertar modelos
      await Car.insertMany(models);

      console.log('DB populated OK');
      mongoose.connection.close();
  } catch (err) {
      console.error('Error inicializando data:', err);
      mongoose.connection.close();
  }
});
