const mongoose = require('mongoose');

const User = require('./UserModel.js');
const Discussion = require ('./DiscModel.js');
const Course = require ('./ClassModel.js');
const Note = require ('./NotesModel.js');
const Comment = require ('./CommentModel.js');
const Requirement = require ('./ReqsModel.js');
 
const url = 'mongodb://localhost:27017/blueprint';

const options = {
    useUnifiedTopology: true
};

const database = {
    connect: function () {
        mongoose.connect(url, options, function(error) {
            if(error) throw error;
            console.log('Connected to: ' + url);
        });
    },

    insertOne: function(model, doc, callback) {
        model.create(doc, function(error, result) {
            console.log (error);
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    insertMany: function(model, docs, callback) {
        model.insertMany(docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },


    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            
            if(error) return callback(false);
            return callback(result);
        }).lean();
    },

    findMany: function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        }).lean();
    },

    updateOne: function(model, filter, update, callback) {
        model.findOneAndUpdate(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(result);
        });
    },

    updateMany: function(model, filter, update, callback) {
        model.updateMany(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(result);
        });
    },

    deleteOne: function(model, conditions, callback) {
        model.deleteOne(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function(model, conditions, callback) {
        model.deleteMany(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    count : function (model, query, callback) {
        model.countDocuments (query, function (error, result) {
            if(error) return callback(false);
            console.log('Documents: ' + result);
            return callback(result);
        });
    },

    generateRandomUniqueID : function (model) {
        console.log("hallu");
        do {
            console.log("rawr");
            var temp = Math.floor(Math.random() * (999999 - 0 + 1)) + 0;
            var query;
            switch (true) {
                case model instanceof Course: 
                    query = {classID : temp}; console.log("1"); break;
                case model instanceof Discussion: 
                    query = {discID : temp}; console.log("2"); break;
                case model instanceof Note: 
                    query = {notesID : temp}; console.log("3"); break;
                case model instanceof Comment: 
                    query = {commentID : temp}; console.log("4"); break;
                case model instanceof Requirement: 
                    query = {reqID : temp}; console.log("5");
            }
            
            model.findOne(query, '', function (flag) {
                if(!flag) return temp;
            });
            console.log("sadt");
        } while (true);
    }
}

module.exports = database;