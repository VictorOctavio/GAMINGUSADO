const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const messageSchema = Schema({
    name: String,
    email: String,
    message: String,
    fecha: String
});

messageSchema.plugin(mongoosePaginate)

module.exports = model('message', messageSchema);