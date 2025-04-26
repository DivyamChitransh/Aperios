const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    itemId : {type:mongoose.Schema.Types.ObjectId,ref:'Item',required:true},
    quantity: {type:Number,required:true,default:1}
});

const cartuserSchema = new mongoose.Schema({
    userID : {type:String,required:true},
    items : [cartSchema],
    promoCode : {type:mongoose.Schema.Types.ObjectId,ref:'PromoCode'}
});

module.exports = mongoose.model('cart',cartuserSchema);