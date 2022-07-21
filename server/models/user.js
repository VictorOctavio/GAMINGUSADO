const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = Schema({
    username: String,
    password: String,
    email: String,
    confirmUser: false,
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],
    bloqued: false,
    saved: [{
        ref: "productos",
        type: Schema.Types.ObjectId
    }],
    categoria_vista: [{type: String}]
},{
    timestamps: true,
    versionKey: false
});


//Encriptar Passaword Register
userSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

//Comparar Passaword Login
userSchema.statics.comparePassword = async(password, pass) => {
    return bcrypt.compare(password, pass);
}

//Paginate
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('users', userSchema);
