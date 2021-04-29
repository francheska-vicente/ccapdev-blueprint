const express = require('express');
const bodyParser = require (`body-parser`);

const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');
const successController = require('../controllers/successController.js');
const classController = require('../controllers/classController.js');

const app = express();

app.use(bodyParser.urlencoded ({extended : false}));
app.use(bodyParser.json());

app.get('/', controller.getSplash);

app.get('/login', controller.getLogin);
app.post('/login', controller.postLogin);
app.get('/register', controller.getSignUp);
app.post('/register', signupController.postSignUp);
app.get('/register-success', successController.getSuccessReg);

app.get('/home', controller.getHome);

app.get('/profile', controller.getYourProfile);
app.get('/profile/edit', controller.getEditProfile);
app.post('/profile/edit', controller.postEditProfile);
app.get('/profile/delete', controller.getDelProfile);
app.post('/profile/delete', controller.postDelProfile);

app.get('/schedule', controller.getYourSchedule);
app.get('/schedule/create', controller.getAddClass);
app.post('/schedule/create', controller.postAddClass);
app.get('/schedule/search', controller.getSearchClass);
app.get('/schedule/delete', controller.getDeleteClass);

app.get('/profile-deletion-success', successController.getSuccessReg);

app.get('/:username/profile', controller.getUserProfile);
app.get('/:username/schedule', controller.getUserSchedule);

app.get('/classes/dashboard', controller.getDashboard);
app.get('/classes/:classID/home', classController.getClass);
app.get('/classes/:classID/classlist', classController.getClassList);
app.get('/classes/:classID/requirements', classController.getReqs);
app.get('/classes/:classID/notebook', classController.getNotes);

app.get('/classes/:classID/discussions', classController.getDiscussions);
app.get('/classes/:classID/discussions/:discID', classController.getDiscussionsPost);
app.post('/classes/:classID/:discID', classController.editDiscussions);
app.post('/classes/:classID/discussions/:discID/comment', controller.addCommentDiscussions);
app.get('/classes/:classID/discussions/:discID/delete', classController.deleteDiscussion);
app.post('/classes/:classID/:discID/:commentID', classController.editComment);
app.post('/classes/:classID/discussions/:discID/:commentID/comment', controller.addComment);
app.get('/classes/:classID/discussions/:discID/:commentID/delete', classController.deleteComment);

app.get('/classes/:classID/new_discussion', classController.newDiscussion);
app.post('/classes/:classID/discussions/addNewDisc', controller.addNewDisc);

module.exports = app;