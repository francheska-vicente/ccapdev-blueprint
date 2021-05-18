const express = require('express');

const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');
const loginController = require('../controllers/loginController.js');
const logoutController = require('../controllers/logoutController.js');
const homeController = require('../controllers/homeController.js');
const scheduleController = require('../controllers/scheduleController.js');
const classController = require('../controllers/classController.js');
const discController = require('../controllers/discController.js');
const notesController = require('../controllers/notesController.js');
const reqsController = require('../controllers/reqsController.js');
const profileController = require('../controllers/profileController.js');
const userController = require('../controllers/userController.js');
const successController = require('../controllers/successController.js');
const errorController = require('../controllers/errorController.js');
const validation = require('../helpers/validation.js');

const app = express();

// index
app.get('/', controller.getSplash);

// login + register
app.get('/login', loginController.getLogin);
app.post('/login', loginController.postLogin);
app.get('/logout', logoutController.getLogout);
app.get('/register', signupController.getSignUp);
app.post('/register', validation.signUpValidation (), signupController.postSignUp);
app.get('/register-success', successController.getSuccessReg);
app.get('/getCheckUsername', signupController.getCheckUsername);
app.get('/getCheckEmail', signupController.getCheckEmail);

// home
app.get('/home', homeController.getHome);
app.get('/getReqsDates', homeController.getReqsDates);

//search
app.get('/search', controller.getSearch);

// profile
app.get('/profile', profileController.getYourProfile);
app.get('/profile/edit', profileController.getEditProfile);
app.post('/profile/edit', profileController.postEditProfile);
app.get('/profile/delete', profileController.getDelProfile);
app.post('/profile/delete', profileController.postDelProfile);
app.get('/profile-deletion-success', successController.getSuccessReg);

// schedule + class management
app.get('/schedule', scheduleController.getYourSchedule);
app.get('/schedule/create', scheduleController.getCreateClass);
app.post('/schedule/create', scheduleController.postCreateClass);
app.get('/schedule/search', scheduleController.getSearchClass);
app.post('/schedule/search', scheduleController.postSearchClass);
app.get('/schedule/search/results', scheduleController.getSearchClassResults);
app.post('/schedule/search/:classID/add', scheduleController.postAddClass);
app.get('/schedule/drop', scheduleController.getDeleteClass);
app.post('/schedule/drop', scheduleController.postDeleteClass);

// view other users
app.get('/:username/profile', userController.getUserProfile);
app.get('/:username/schedule', userController.getUserSchedule);

// dashboard + class
app.get('/classes/dashboard', classController.getDashboard);
app.get('/classes/:classID/home', classController.getClass);
app.get('/classes/:classID/classlist', classController.getClassList);

// requirements
app.get('/classes/:classID/requirements', reqsController.getReqs);
app.get('/classes/:classID/requirements/add', reqsController.getAddReqs);
app.post('/classes/:classID/requirements/add', reqsController.postAddReqs);
app.post('/classes/:classID/requirements/:reqID/edit', reqsController.editReqsPost);
app.post('/classes/:classID/requirements/:reqID/delete', reqsController.deleteReqsPost);

// notebook hub
app.get('/classes/:classID/notebook', notesController.getNotes);
app.get('/classes/:classID/notebook/add', notesController.getAddNotes);
app.post('/classes/:classID/notebook/add', notesController.postAddNotes);

// notebook post
app.get('/classes/:classID/notebook/:notesID', notesController.getNotesPost);
app.post('/classes/:classID/notebook/:notesID/edit', notesController.editNotesPost);
app.post('/classes/:classID/notebook/:notesID/delete', notesController.deleteNotesPost);

// notebook comments
app.post('/classes/:classID/notebook/:notesID/comment', notesController.addCommentToNotes);
app.post('/classes/:classID/notebook/:notesID/:commentID/edit', notesController.editCommentOfNotes);
app.post('/classes/:classID/notebook/:notesID/:commentID/comment', notesController.addCommentToComment);
app.post('/classes/:classID/notebook/:notesID/:commentID/delete', notesController.deleteCommentOfComment);

// discussions hub
app.get('/classes/:classID/discussions', discController.getDiscussions);
app.get('/classes/:classID/discussions/add', discController.getAddDiscussion);
app.post('/classes/:classID/discussions/add', discController.postAddDiscussion);

// discussion post
app.get('/classes/:classID/discussions/:discID', discController.getDiscussionPost);
app.post('/classes/:classID/discussions/:discID/edit', discController.editDiscussionPost);
app.post('/classes/:classID/discussions/:discID/delete', discController.deleteDiscussionPost);

// discussion comments
app.post('/classes/:classID/discussions/:discID/comment', discController.addCommentToDiscussion);
app.post('/classes/:classID/discussions/:discID/:commentID/edit', discController.editCommentOfDiscussion);
app.post('/classes/:classID/discussions/:discID/:commentID/comment', discController.addCommentToComment);
app.post('/classes/:classID/discussions/:discID/:commentID/delete', discController.deleteCommentOfComment);

// error pages
app.get('/error/401', errorController.get401);
app.get('/error/403', errorController.get403);
app.get('/error/404', errorController.get404);

module.exports = app;