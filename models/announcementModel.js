var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator=require('./validator');
var sellerModel = require('./sellerModel')

var AnnoucementSchema = new Schema({
    announceId:Schema.Types.ObjectId,
    announceSellerId: {type: Schema.Types.ObjectId, ref: 'seller'},
    announceText: {type: String},
    announceViewsNumber: Number,
    createdOn: {type: Date, default: Date.now()}

});

AnnoucementSchema.statics.getAnnouncement=function (announceid,callback) {// 2params err, annoucement
    annoucementModel.findOne({_id: announceid}, callback)
}
AnnoucementSchema.statics.updateAnnouncement=function (announceid,fields,callback) {// 2params err, docs
    annoucementModel.update({_id:announceid},{$set:fields},callback)
}

var annoucementModel = mongoose.model('announcement', AnnoucementSchema);


module.exports = annoucementModel;