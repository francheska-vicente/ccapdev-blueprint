const express = require('express');
const bodyParser = require (`body-parser`);

const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');
const successController = require('../controllers/successController.js');

const app = express();

app.use (bodyParser.urlencoded ({extended : false}));
app.use(bodyParser.json());

app.get('/', controller.getSplash);

app.get('/login', controller.getLogin);
app.get('/register', signupController.getSignUp);
app.post('/register', signupController.postSignUp);
app.get('/register-success', successController.getSuccessReg);

app.get('/home', controller.getHome);

app.get('/profile/:username', controller.getYourProfile);
app.get('/schedule/yourschedule', controller.getYourSchedule);

app.get('/profile-deletion-success', successController.getSuccessReg);

app.get('/:username/profile', controller.getUserProfile);
app.get('/:username/schedule', controller.getUserSchedule);

app.get('/classes/dashboard', controller.getDashboard);
app.get('/classes/:coursecode/home', controller.getClass);

module.exports = app;