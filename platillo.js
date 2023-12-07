const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    Nombre: String,
    Descripcion: String,
    Precio_producto: Number
});


const Platillo = mongoose.model('Platillo', productoSchema);

module.exports = Platillo;