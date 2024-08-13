const { google } = require('googleapis')

const SCOPES = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
const oauth2Client = new google.auth.OAuth2(
    '39217347935-h1pp3c2dfrq2ve0dnkl1ihm9pff2qvi4.apps.googleusercontent.com',
    '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',
    'http://localhost:3000/sign-in'
)

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

    } catch (error) {

    }
}

module.exports = {
    getAuthUrl
}