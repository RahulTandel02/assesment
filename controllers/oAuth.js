const { google } = require('googleapis')
const url = require('url')
const User = require('../models/user')
const SCOPES = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
const oauth2Client = new google.auth.OAuth2(
    `${process.env.Client_ID}`,
    `${process.env.Client_secret}`,
    'http://localhost:4200'
)
const jwt = require('jsonwebtoken')


const getAuthUrl = async (req, res) => {
    try {
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        })
        return res.send({ url })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
}

const signIn = async (req, res) => {
    try {
        console.log(req.url)
        const q = url.parse(req.url, true).query
        if (q.error) {
            return res.redirect('localhost:4200')
        }
        const { tokens } = await oauth2Client.getToken(q.code)
        oauth2Client.setCredentials(tokens)
        var oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });
        const userData = await oauth2.userinfo.get()
        const data = userData.data

        const u = await User.findOne({ email: data.email })
        let token
        if (!u) {
            const user = new User({
                email: data.email,
                name: data.name,
                googleData: data,
                accessToken: JSON.stringify(tokens)
            })
            await user.save()
            token = jwt.sign(user._id.toString(), process.env.JWT_PASS, {
                algorithm: 'HS256'
            })
        } else {
            token = jwt.sign(u._id.toString(), process.env.JWT_PASS, {
                algorithm: 'HS256'
            })
        }
        return res.send({ token })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

module.exports = {
    getAuthUrl,
    signIn
}