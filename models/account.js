const mongoose = require('mongoose')
const { Schema, model } = mongoose

const accountSchema = new Schema({
    _id: Schema.Types.ObjectId,
    account_id: Number,
    limit: Number,
    products: Array
})

const Account = model('Account', accountSchema)
module.exports = Account;