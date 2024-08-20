const mongoose = require('mongoose')
const { Schema, model } = mongoose

const customerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true },
    active: { type: Boolean, required: true },
    accounts: { type: [Number], required: true },
    tier_and_details: {
        type: Object
    }
})

const Customer = model('Customer', customerSchema)
module.exports = Customer;