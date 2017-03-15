var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userModel = require('./userModel')

var PublicationSchema = new Schema({
    publicationTitle: String,
    publicationText: String,
    publicationPublisherId: {type: Schema.Types.ObjectId, ref: userModel},

    createdOn: {type: Date, default: Date.now()}

});
var publicationModel = mongoose.model('Publication', PublicationSchema);

module.exports = publicationModel