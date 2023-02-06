import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header'
import Cart from '../Cart/cart'
import Container from './Container'
import NavBar from '../Header/NavBar'
import { useContext } from 'react'
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext'
import Card from '../Card/Card';
function Books() {
  const { getBooks, setSearchBook,searchBook, setBooks, books } = useContext(UserContext);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3000);
  function priceRange(m, ma) {
    setMin(m);
    setMax(ma);
  }
  let [count, setC] = useState(0);
  const location = useLocation();
  const category = location.pathname;
  let seacrhCategory = category.slice(1).toLocaleLowerCase();
  seacrhCategory = seacrhCategory.charAt(0).toUpperCase() + category.slice(2);
  useEffect(() => {
    if (books) {
      getBooks(seacrhCategory, min, max);
    } else {
      axios.get('/books').then((res) => res.data).then((data) => setBooks(data));
      setC(count + 1);
    }
  }, [category, count]);
  return (
    <div className='relative'>
      <Header color={"sdf"}/>
      <div className="cart">
        <Cart />
      </div>
      <div className="flex lg:flex-row flex-col">
        <NavBar priceRange={priceRange} setSearchBook={setSearchBook} />
        <div className="books w-full">
          {
            searchBook && <div className='lg:w-1/4 bg-gray-300 rounded-md mx-auto'> {<Card item={searchBook.item}/>}</div>
          }
          {
            !searchBook && <Container min={min} max={max} />
          }
        </div>
      </div>
      <Cart />
    </div>
  )
}

export default Books