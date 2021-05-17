const mongoose = require('mongoose');

const User = require('./UserModel.js');
const Discussion = require ('./DiscModel.js');
const Course = require ('./ClassModel.js');
const Note = require ('./NotesModel.js');
const Comment = require ('./CommentModel.js');
const Reqs = require ('./ReqsModel.js');

const url = 'mongodb+srv://admin:blueprint@blueprint.gykvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {
    connect: function () {
        mongoose.connect(url, options, function(error) {
            if(error) console.log (error);
            console.log('Connected!');
        });
    },

    insertOne: function(model, doc, callback) {
        model.create(doc, function(error, result) {
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

    findManyReqs : function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        }).sort ({deadline: 1}).lean();
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

    getObjectID : function () {
        return mongoose.Types.ObjectId().toString();
    }
}

module.exports = database;