const express = require('express')
const { getAuthUrl, signIn } = require('../controllers/oAuth')

const app = express.Router()

app.get('/get-url', getAuthUrl)
app.get('/sign-in', signIn)

module.exports = app