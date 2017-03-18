/**
 * Created by kissi on 13/03/17.
 */
var mongoose = require('mongoose');
var messageSchema = require('./messageModel');
var Schema = mongoose.Schema;
var userModel = require('./userModel');
var DiscussionSchema = new Schema({
    messageSender: {type: Schema.Types.ObjectId, ref: 'user'},
    messageReceiver: {type: Schema.Types.ObjectId, ref: 'user'},
    messages: [messageSchema],
    createdOn: {type: Date, default: Date.now()}

});
var discussionModel = mongoose.model('discussion', DiscussionSchema);

module.exports = discussionModel;
