require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app')
const port = process.env.PORT || 4001;

mongoose.connect('mongodb://localhost:27017/templateDB', () => {
    app.listen(port, () => {
        console.log(`Listening at ${port}`)
    });
});