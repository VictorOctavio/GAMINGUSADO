const {model, Schema} = require('mongoose')

const new_sub = Schema({
    email: String
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Sub', new_sub)