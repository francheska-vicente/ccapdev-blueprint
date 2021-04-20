const express = require('express');
const controller = require('../controllers/controller.js')
const app = express();

app.get('/profile/:username', controller.getProfile);
app.get('/home', controller.getHome);
app.get('/schedule/yourschedule', controller.getYourSchedule);
app.get('/user/:username/profile', controller.getUser);
app.get('/classes/dashboard', controller.getDashboard);
app.get('/classes/:coursecode/home', controller.getClass);

module.exports = app;