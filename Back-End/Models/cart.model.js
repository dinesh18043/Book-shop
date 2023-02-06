const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    _id : {type : String, required:true},
    bookImg : {type: String, required : true},
    bookName : {type : String,required : true},
    bookPublication : {type : String,required : true},
    category : {type : String,required : true},
    author : {type: String, required : true},
    price : {type: Number, required : true},
    sellingPrice : {type:Number,required:true},
    count : {type : Number,required:true},
},{
    timestamps : true,
});

const Cart = mongoose.model("Cart",cartSchema);

module.exports = Cart;