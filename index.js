const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()

const mongoose = require('mongoose');
const cors = require('cors')
const authRouter = require('./routes/auth')
const homeRouter = require('./routes/home')
const authenticate = require('./middlewares/authenticate')

mongoose.connect('mongodb://localhost:27017/test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('Connection error', err);
});

app.use(cors())

app.use('/auth', authRouter)
app.use(authenticate)
app.use('/home', homeRouter)

// app.get('/get-url', getAuthUrl)



app.listen(3000, () => {
    console.log('Listening to PORT 3000')
})
