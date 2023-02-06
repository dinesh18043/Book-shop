const express = require("express")
const router = express.Router();
const Books = require('../Models/book.model')

router.route('/').get((req,res) => {
    Books.find().then(data => res.json(data))
        .catch(err => res.statusCode(400).json('Errors: ' + err));
});

router.route('/search').post(async (req, res) => {
    let payload = req.body.payload.trim();
    let search = await Books.find({ bookName: { $regex: new RegExp('^' + payload + '.*', 'i') } });
    search = search.slice(0,8);
    res.send({payload:search});
});

router.route('/add').post((req,res)=>{
    const bookName = req.body.bookName;
    const bookPublication = req.body.item.publication;
    const bookImg = req.body.bookImg;
    const author = req.body.author;
    const price = req.body.price;
    const sellingPrice = req.body.item.sellingPrice;
    const category = req.body.category;
    const bookCount = req.body.category;
    const newItem = new Books({bookImg,bookName,category,bookPublication,author,price,sellingPrice,bookCount});
    newItem.save()
    .then(() => res.json('Items added!'))
    .catch(err => res.status(400).json("Error : " + err));
});

module.exports = router;