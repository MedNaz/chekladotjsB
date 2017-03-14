var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var UserAccountSchema = new Schema({

    accountUsername: {type : String, required : true},
    accountEmail : {type : String, required : true, unique: true},
    accountPassword : {type : String, required : true},
    accountUserGender :  {type: String, require: true},
    createdOn : {type :Date, default:Date.now()}
});

var userAccountModele=mongoose.model('account',UserAccountSchema);
module.exports=userAccountModele;