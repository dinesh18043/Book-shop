const express = require("express")
const cors = require('cors')
const {default : mongoose} = require('mongoose');
require('dotenv').config();

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const uri = "mongodb://127.0.0.1:27017/BookStore?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2";
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("Connection made");
});

const cart = require('./Routes/cart')
const books = require('./Routes/books')
app.use("/cart",cart);
app.use("/books",books);

app.listen(port,()=>{
    console.log("listinging on port 5000");
})