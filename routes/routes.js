const express = require('express');
const bodyParser = require (`body-parser`);

const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');
const scheduleController = require('../controllers/scheduleController.js');
const classController = require('../controllers/classController.js');
const discController = require('../controllers/discController.js');
const profileController = require('../controllers/profileController.js');
const successController = require('../controllers/successController.js');
const errorController = require('../controllers/errorController.js');

const app = express();

app.use(bodyParser.urlencoded ({extended : false}));
app.use(bodyParser.json());

app.get('/', controller.getSplash);

app.get('/login', controller.getLogin);
app.post('/login', controller.postLogin);
app.get('/register', signupController.getSignUp);
app.post('/register', signupController.postSignUp);
app.get('/register-success', successController.getSuccessReg);

app.get('/home', controller.getHome);
app.get('/search', controller.getSearch);

app.get('/profile', profileController.getYourProfile);
app.get('/profile/edit', profileController.getEditProfile);
app.post('/profile/edit', profileController.postEditProfile);
app.get('/profile/delete', profileController.getDelProfile);
app.post('/profile/delete', profileController.postDelProfile);
app.get('/profile-deletion-success', successController.getSuccessReg);

app.get('/schedule', scheduleController.getYourSchedule);
app.get('/schedule/create', scheduleController.getCreateClass);
app.post('/schedule/create', scheduleController.postCreateClass);
app.get('/schedule/search', scheduleController.getSearchClass);
app.post('/schedule/search', scheduleController.postSearchClass);
app.get('/schedule/search/results', scheduleController.getSearchClassResults);
app.post('/schedule/search/:classID/add', scheduleController.postAddClass);
app.get('/schedule/drop', scheduleController.getDeleteClass);
app.post('/schedule/drop', scheduleController.postDeleteClass);

app.get('/:username/profile', controller.getUserProfile);
app.get('/:username/schedule', controller.getUserSchedule);

app.get('/classes/dashboard', classController.getDashboard);
app.get('/classes/:classID/home', classController.getClass);
app.get('/classes/:classID/classlist', classController.getClassList);

app.get('/classes/:classID/requirements', classController.getReqs);
app.get('/classes/:classID/requirements/add', classController.getAddReqs);
app.post('/classes/:classID/requirements/add', classController.postAddReqs);

app.post('/classes/:classID/requirements/:reqID/edit', classController.editReqsPost);
app.post('/classes/:classID/requirements/:reqID/delete', classController.deleteReqsPost);

app.get('/classes/:classID/notebook', classController.getNotes);
app.get('/classes/:classID/notebook/add', classController.getAddNotes);
app.post('/classes/:classID/notebook/add', classController.postAddNotes);

app.get('/classes/:classID/notebook/:notesID', classController.getNotesPost);
app.post('/classes/:classID/notebook/:notesID/edit', classController.editNotesPost);
app.post('/classes/:classID/notebook/:notesID/delete', classController.deleteNotesPost);

app.post('/classes/:classID/notebook/:notesID/comment', classController.addCommentToNotes);
app.post('/classes/:classID/notebook/:notesID/:commentID/edit', classController.editCommentOfNotes);

app.post('/classes/:classID/notebook/:notesID/:commentID/comment', classController.addCommentToCommentNotes);
app.post('/classes/:classID/notebook/:notesID/:commentID/delete', classController.deleteCommentOfCommentNotes);

app.get('/classes/:classID/discussions', discController.getDiscussions);
app.get('/classes/:classID/discussions/add', discController.getAddDiscussion);
app.post('/classes/:classID/discussions/add', discController.postAddDiscussion);

app.get('/classes/:classID/discussions/:discID', discController.getDiscussionPost);
app.post('/classes/:classID/discussions/:discID/edit', discController.editDiscussionPost);
app.post('/classes/:classID/discussions/:discID/delete', discController.deleteDiscussionPost);

app.post('/classes/:classID/discussions/:discID/comment', discController.addCommentToDiscussion);
app.post('/classes/:classID/discussions/:discID/:commentID/edit', discController.editCommentOfDiscussion);

app.post('/classes/:classID/discussions/:discID/:commentID/comment', discController.addCommentToComment);
app.post('/classes/:classID/discussions/:discID/:commentID/delete', discController.deleteCommentOfComment);


app.get('/error/401', errorController.get401);
app.get('/error/403', errorController.get403);
app.get('/error/404', errorController.get404);
module.exports = app;