const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    name: String,
    password: String
})

const User = model('User', userSchema)
module.exports = User;