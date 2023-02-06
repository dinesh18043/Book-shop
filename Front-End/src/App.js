import React, { useState, useEffect } from 'react'
import Home from './components/HomePage/Home'
import axios from 'axios'
import Books from './components/Books/Books'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from './components/Admin/Admin'
import { UserContext } from './components/UserContext/UserContext'
function App() {
  const [flag, setFlag] = useState(0);
  const [show, setShow] = useState("");
  const [books, setBooks] = useState("");
  const [searchBook, setSearchBook] = useState("");
  const [bookData, setBookData] = useState("");
  const [cartData, setCartData] = useState("");
  const fetchBooks = async () => {
    await axios.get('/books').then((res) => res.data).then((data) => setBooks(data));
    await axios.get('/cart/items').then((res) => res.data).then((data) => setCartData(data));
  }
  useEffect(() => {
    fetchBooks();
  }, [])
  const getBooks = async (type, min, max) => {
    if (type === 'home') {
      setBookData(books.slice(1, 9));
    } else if (type === 'All') {
      setBookData(books.slice(1, 13));
    }
    else {
      const newBookData = books.filter(
        (book) => ((book.category === type) && (book.sellingPrice > min) && (book.sellingPrice < max))
      );
      setBookData(newBookData);
    }
  }
  const showCart = () => {
    setShow("showCart");
  }
  const hideCart = () => {
    if (show) {
      setShow("");
    }
  }
  const changeFlag = () => {
    setFlag((flag + 1) % 2);
  }
  return (
    <div className='lg:w-100'>
      <UserContext.Provider value={{ show, flag, cartData, setCartData, searchBook, setSearchBook, getBooks, setBooks, books, bookData, setBookData, showCart, hideCart, changeFlag }}>
        <Router>
          <Routes>
            <Route key="home" index element={<Home />}></Route>
            <Route path="admin" element={<Admin />} />
            <Route key='all' path="all" element={<Books />} />
            <Route key='engineering' path="engineering" element={<Books />} />
            <Route key='arts' path="arts" element={<Books />} />
            <Route key='medical' path="medical" element={<Books />} />
            <Route key='cbse' path="cbse" element={<Books />} />
            <Route key='stateBoard' path="stateboard" element={<Books />} />
            <Route key='competitive' path="competitive" element={<Books />} />
            <Route key='story' path="story" element={<Books />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  )
}

export default App