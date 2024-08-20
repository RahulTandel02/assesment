const express = require('express')
const { listCustomers, getTransactionForCustomer, transactionBelow, account } = require('../controllers/home')

const router = express.Router()

router.get('/customers', listCustomers)
router.get('/transaction/least', transactionBelow)
router.get('/account', account)
router.get('/transaction/:id', getTransactionForCustomer)

module.exports = router