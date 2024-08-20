const jwt = require('jsonwebtoken')
const User = require('../models/user')
const mongoose = require('mongoose')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        if (!token) {
            return res.status(404).send({ message: 'Token not found' })
        }
        const payload = jwt.decode(token, process.env.JWT_PASS)
        const id = new mongoose.Types.ObjectId(payload)
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}