const mongoose = require('mongoose');

const PromoSchema = new mongoose.Schema({
    promocode : {type:String,required:true,unique:true},
    type:{type:String,enum:['flat','percentage'],required:true},
    value:{type:Number,required:true},
    expiresAt:{type:Date},
    usageLimit:{type:Number,default:1}
});

module.exports = mongoose.model('PromoCode',PromoSchema)