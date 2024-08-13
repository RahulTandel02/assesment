const express = require('express')

const app = express()

const mongoose = require('mongoose');
const User = require('./models/user');
const { getAuthUrl } = require('./controllers/oAuth');
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('Connection error', err);
});

app.use(cors())


app.get('/get-url', getAuthUrl)

app.listen(3000, () => {
    console.log('Listening to PORT 3000')
})
