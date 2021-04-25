const express = require('express');

const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');

const app = express();

app.get('/register', signupController.getSignUp);
app.post('/register', signupController.postSignUp);

app.get('/profile/:username', controller.getProfile);
app.get('/home', controller.getHome);
app.get('/schedule/yourschedule', controller.getYourSchedule);
app.get('/user/:username/profile', controller.getUser);
app.get('/classes/dashboard', controller.getDashboard);
app.get('/classes/:coursecode/home', controller.getClass);

module.exports = app;