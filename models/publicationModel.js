var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userModel = require('./userModel');

var PublicationSchema = new Schema({
    publicationTitle: String,
    publicationText: String,
    publicationPublisherId: {type: Schema.Types.ObjectId, ref: 'user'},

    createdOn: {type: Date, default: Date.now()}

});
var publicationModel = mongoose.model('publication', PublicationSchema);

module.exports = publicationModel;