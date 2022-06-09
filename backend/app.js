const express = require("express");
require('express-async-errors');
const cors = require("cors");
//const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');

const app = express();

const corsOptions = {
    origin: process.env.APP_URL,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use([
    morgan(':method :url :status :res[content-length] - :response-time ms'),
]);

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboards', dashboardRoutes);

/* 
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
 */

app.use(errorHandler);

module.exports = app;
