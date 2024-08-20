const Account = require("../models/account")
const Customer = require("../models/customer")
const Transaction = require("../models/transaction")

const listCustomers = async (req, res) => {
    try {
        const { size, pageNumber } = req.query
        const offset = size * pageNumber
        const count = await Customer.find().countDocuments()
        const user = await Customer.find().sort('name').skip(offset).limit(size)
        return res.send({
            page: {
                totalElements: count,
                size,
                pageNumber,
                totalPages: count / pageNumber
            },
            data: user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
}

const getTransactionForCustomer = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Transaction.findOne({
            account_id: +id
        })
        return res.send(data.transactions)
    } catch (error) {
        console.log(error)
    }
}

const transactionBelow = async (req, res) => {
    try {
        const transaction = await Transaction.find({
            "transactions.amount": { $lt: 5000 }
        })
        return res.send(transaction)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

const account = async (req, res) => {
    try {
        const account = await Account.distinct("products")
        return res.send(account)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

module.exports = {
    listCustomers,
    getTransactionForCustomer,
    transactionBelow,
    account
}