import React, { useState } from 'react'
import axios from 'axios';
import './Admin.css'
import { useNavigate} from 'react-router-dom';
export default function Admin() {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(0); 
  const [sellingPrice, setSellingPrice] = useState(0); 
  const [bookImg, setBookImg] = useState("");
  const [publication,setPublication] = useState("");
  const [Category, setCategory] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(bookName);
    console.log(author);
    console.log(price);
    console.log(bookImg);
    axios.post("/cart/add", { bookName: bookName, author: author, publication:publication, price: price, sellingPrice: sellingPrice, bookImg: bookImg, category: Category }).then((res) => res.data).then((data) => console.log(data));
  }
  const onBook = (e) => {
    const files = e.target.files;
    const file = files[0];
    getbase64(file);
  }

  const onLoad = (fileString) => {
    setBookImg(fileString);
  }
  const getbase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      onLoad(reader.result);
    }
  }
  const navigate = useNavigate();
  return (
    <div className='admin-container'>
      <div className="back-shop">
      <button onClick={()=>navigate(-1)}>Logo</button>
      </div>
      <form className='item-form' onSubmit={(e) => onSubmit(e)}>
        <h3 className='my-1 font-semibold'>bookName</h3>
        <input type="text" placeholder='bookName' onChange={(e) => setBookName(e.target.value)} />
        <h3 className='my-1 font-semibold'>Category</h3>
        <input type="text" placeholder='bookName' onChange={(e) => setCategory(e.target.value)} />
        <h3 className='my-1 font-semibold'>Publication</h3>
        <input type="text" placeholder='publication' onChange={(e) => setPublication(e.target.value)} />
        <h3 className='my-1 font-semibold'>author</h3>
        <input type="text" placeholder='authorName' onChange={(e) => setAuthor(e.target.value)} />
        <h3 className='my-1 font-semibold'> price</h3>
        <input type="number" placeholder='bookPrice' onChange={(e) => setPrice(e.target.value)} />
        <h3 className='my-1 font-semibold'> sellingPrice</h3>
        <input type="number" placeholder='sellingPrice' onChange={(e) => setSellingPrice(e.target.value)} />
        <h3 className='my-1 font-semibold'>bookImg</h3>
        <input type="file" placeholder='book image' onChange={(e) => onBook(e)} /><br />
        <input className='text-white mt-2 text-lg py-1.5 rounded-md bg-gray-500 w-2/5 mx-auto' type="submit" />
      </form>
    </div>
  );
}