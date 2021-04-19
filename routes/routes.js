const express = require('express');
const controller = require('../controllers/controller.js')
const app = express();

app.get('/profile/:username', controller.getProfile);
app.get('/home', controller.getHome);
app.get('/schedule/yourschedule', controller.getYourSchedule);

module.exports = app;