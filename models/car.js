// models/car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
        name: { type: String, required: true },
        average_price: { type: Number, required: true },
        brand_name: { type: String, required: true }
    },
    {
        toJSON: { virtuals: true, transform: docToObj },
        toObject: { virtuals: true, transform: docToObj }
    });
      // Función de transformación para cambiar _id a id y eliminar __v
      function docToObj(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }

      
module.exports= mongoose.model('Model', carSchema);