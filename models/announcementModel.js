var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sellerModel = require('./sellerModel')

var AnnoucementSchema = new Schema({
    announceId:Schema.Types.ObjectId,
    announceSellerId: {type: Schema.Types.ObjectId, ref: 'seller'},
    announceText: {type: String},
    announceViewsNumber: Number,
    createdOn: {type: Date, default: Date.now()}

});
var annoucementModel = mongoose.model('announcement', AnnoucementSchema);

module.exports = annoucementModel;