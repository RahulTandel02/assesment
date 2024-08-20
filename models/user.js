const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    name: String,
    password: String,
    googleData: Object,
    accessToken: String,
    email: String
})

const User = model('User', userSchema)
module.exports = User;