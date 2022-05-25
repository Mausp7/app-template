const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true}, // "" should not be enough
    content: {type: String, required: true}, // "" is enough
    isdone: {type: Boolean, required: true, default: false},
});

const dashboardSchema = new mongoose.Schema({
    title: {type: String, required: true}, // "" should not be enough
    todos: [todoSchema], // default empty list?
});

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true}, // "" should not be enough !!!unique
    googleId: {type: String, required: true, unique: true}, // "" should not be enough !!!unique
    //password: {type: String, required: true}, // "" should not be enough, maybe validation
    dashboards: [dashboardSchema], // default empty list?
});

const User = mongoose.model('User', userSchema);

module.exports = User;