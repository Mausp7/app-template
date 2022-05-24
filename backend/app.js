require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 4001;


const corsOptions = {
    origin: process.env.APP_URL,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use([
    logger
]);


//mongoose.connect('mongodb://localhost:27017/test', () => {
//});

app.get('/api/public', (req, res) => {
    console.log('Hello Public World!')
    res.send('Hello Public World!');

});

app.get('/api/private', auth({block: true}), (req, res) => {

    console.log('Hello Private World!');
    res.send(`Hello ${res.locals.userId}!`);
});

app.get('/api/prublic', auth({block: false}) , (req, res) => {
    res.send(res.locals.userId ?`Hello ${res.locals.userId}!` : 'Hello Public World!');
});


app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening at ${port}`)
});
