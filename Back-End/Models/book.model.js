const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const booksSchema = new Schema({
    bookImg: { type: String, required: true },
    bookName: { type: String, required: true },
    category: { type: String, required: true },
    bookPublication : {type : String,required : true},
    author: { type: String, required: true },
    price: { type: Number, required: true },
    sellingPrice : {type:Number,required:true},
    bookCount : { type: Number, required: true }
},{
    timestamps : true,
})
const Books = mongoose.model("books",booksSchema);
module.exports = Books;