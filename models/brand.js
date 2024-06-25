
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true }
    },{
        toJSON: { virtuals: true, transform: docToObj },
        toObject: { virtuals: true, transform: docToObj }
    });
      // Función de transformación para cambiar _id a id y eliminar __v
      function docToObj(doc, ret) {
        console.log(ret)
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }

module.exports= mongoose.model('Brand', brandSchema);