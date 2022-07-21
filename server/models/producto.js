const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');

const productoSchema = Schema({
    producto: String,
    precio: Number,
    ImageURL: Array,
    descripcion: String,
    categoria: String,
    phone: String,
    email: String,
    user: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
});

productoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('productos', productoSchema);

