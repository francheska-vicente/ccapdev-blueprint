const express = require('express');
const bodyParser = require (`body-parser`);

const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');
const successController = require('../controllers/successController.js');

const app = express();

app.use (bodyParser.urlencoded ({extended : false}));
app.use(bodyParser.json());

app.get('/register', signupController.getSignUp);
app.post('/register', signupController.postSignUp);
app.get('/success', successController.getSuccess);

app.get('/profile/:username', controller.getProfile);
app.get('/home', controller.getHome);
app.get('/schedule/yourschedule', controller.getYourSchedule);
app.get('/user/:username/profile', controller.getUser);
app.get('/classes/dashboard', controller.getDashboard);
app.get('/classes/:coursecode/home', controller.getClass);

module.exports = app;