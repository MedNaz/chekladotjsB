/**
 * Created by kissi on 13/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LocationSchema = new Schema({
    lantitude: Number,
    longitude: Number
});
var locationModel = mongoose.model('Location', LocationSchema);

module.exports = locationModel