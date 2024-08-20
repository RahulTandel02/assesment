const mongoose = require('mongoose')
const { Schema, model } = mongoose

const transactionSchema = new Schema({
    _id: Schema.Types.ObjectId,
    account_id: Number,
    transaction_count: Number,
    bucket_start_date: Date,
    bucket_end_date: Date,
    transactions: Array
})

const Transaction = model('Transaction', transactionSchema)
module.exports = Transaction;