/**
 * Created by kissi on 13/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    categoryName: {type: String},
    categoryTags: [String],
    createdOn: {type: Date, default: Date.now()}

});

var categoryModel = mongoose.model('Category', CategorySchema);
module.exports = categoryModel;
