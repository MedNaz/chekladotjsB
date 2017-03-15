/**
 * Created by kissi on 13/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    messageText: String,
    messageState: String,
    createdOn: {type: Date, default: Date.now()}
});
var messageModel = mongoose.model('message', messageSchema);

module.exports = messageSchema;