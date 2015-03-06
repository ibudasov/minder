var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ThoughtSchema = new mongoose.Schema({
    userId: ObjectId,
    createdAt: {type: Date, default: Date.now},
    itself: {type: String, min: 18, max: 65},
    countToday: {type: Number, default: 1}
});

var Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
