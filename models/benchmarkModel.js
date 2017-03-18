/**
 * Created by kissi on 16/03/17.
 */



var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productModel=require('./productModel')

var BenchmarkSchema = new Schema({
    benchmarkName:{type:String,unique:true},
    benchmarkProductsId:[{type : Schema.Types.ObjectId, ref:'product'}]
});

BenchmarkSchema.statics.updateProductsOfBenchmark=function(prodid){
    productModel.findOne({_id:prodid},function (err,prod) {
        if(err)
            throw err;
        benchmarkModel.findOne({_id:prod.productBenchmark._id},function (err,bench) {
            if(err)
                throw err;
            if ( bench.benchmarkProductsId.indexOf(prodid)===-1) {
                bench.benchmarkProductsId.push(prodid);
                bench.save();
                console.log('saved')
            }
            else{
                console.log("already exists");
            }


        })
    }).populate('productBenchmark')
};

BenchmarkSchema.statics.findAllProductsOfBenchmark=function(benchId){
    this.find({_id:benchId}).populate('benchmarkProductsId').exec(function (err,benchmark) {
        benchmark.forEach(function (e) {
            console.log(e.benchmarkProductsId)
        })
    })
};

BenchmarkSchema.statics.findAllProductsOfBenchmarkByCategory=function (condition) {
    productModel.find(condition,function (err,pro) {
        if(err)
            throw err
        console.log(pro)
    })

}

var benchmarkModel = mongoose.model('benchmark',BenchmarkSchema);

/*
var bench1 = new benchMarkModel({
    benchmarkName:"ASUS"
});
bench1.save();*/


module.exports = benchmarkModel;