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
app.get('/profile-deletion-success', successController.getSuccessReg);

app.get('/schedule', controller.getYourSchedule);
app.get('/schedule/create', controller.getAddClass);
app.post('/schedule/create', controller.postAddClass);
app.get('/schedule/search', controller.getSearchClass);
app.get('/schedule/drop', controller.getDeleteClass);
app.post('/schedule/drop', controller.postDeleteClass);

app.get('/:username/profile', controller.getUserProfile);
app.get('/:username/schedule', controller.getUserSchedule);

app.get('/classes/dashboard', controller.getDashboard);
app.get('/classes/:classID/home', classController.getClass);
app.get('/classes/:classID/classlist', classController.getClassList);
app.get('/classes/:classID/requirements', classController.getReqs);

app.get('/classes/:classID/notebook', classController.getNotes);
app.get('/classes/:classID/notebook/add', classController.getAddNotes);
app.post('/classes/:classID/notebook/add', controller.postAddNotes);

app.get('/classes/:classID/notebook/:notesID', controller.getNotesPost);
app.post('/classes/:classID/notebook/:notesID/edit', classController.editNotesPost);
app.post('/classes/:classID/notebook/:notesID/delete', classController.deleteNotesPost);

app.post('/classes/:classID/notebook/:notesID/comment', controller.addCommentToNotes);
app.post('/classes/:classID/notebook/:notesID/:commentID/edit', classController.editCommentOfNotes);

app.post('/classes/:classID/notebook/:notesID/:commentID/comment', controller.addCommentToCommentNotes);
app.post('/classes/:classID/notebook/:notesID/:commentID/delete', classController.deleteCommentOfCommentNotes);

app.get('/classes/:classID/discussions', classController.getDiscussions);
app.get('/classes/:classID/discussions/add', classController.getAddDiscussion);
app.post('/classes/:classID/discussions/add', controller.postAddDiscussion);

app.get('/classes/:classID/discussions/:discID', controller.getDiscussionPost);
app.post('/classes/:classID/discussions/:discID/edit', classController.editDiscussionPost);
app.post('/classes/:classID/discussions/:discID/delete', classController.deleteDiscussionPost);

app.post('/classes/:classID/discussions/:discID/comment', controller.addCommentToDiscussion);
app.post('/classes/:classID/discussions/:discID/:commentID/edit', classController.editCommentOfDiscussion);

app.post('/classes/:classID/discussions/:discID/:commentID/comment', controller.addCommentToComment);
app.post('/classes/:classID/discussions/:discID/:commentID/delete', classController.deleteCommentOfComment);

module.exports = app;