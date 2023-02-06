import React, { useEffect, useState, createContext, useContext } from 'react'
import axios from 'axios'
import { UserContext, BookContext } from '../UserContext/UserContext';
function Cart() {
  const { show, flag, changeFlag,cartData, setCartData, hideCart } = useContext(UserContext);
  const addCart = async (item) => {
    await axios.post("/cart/add", { item: item }).then((res) => res.data).then(data => { changeFlag() });
  }
  const clearCart = async () => {
    await axios.delete("/cart/clear");
    changeFlag();
  }
  const removeCart = async (item) => {
    await axios.post("/cart/remove", { item: item }).then((res) => res.data).then(data => changeFlag());
    setCartData("");
  }
  const fetch = () =>{
    axios.get('/cart/items/').then((res)=>res.data).then((data)=>setCartData(data));
  }
  useEffect(() => {
    fetch();
  }, [flag,cartData]);
  const value = show ? 'block' : 'hidden';
  return (
    <div>
      <div className={value + ' fixed top-0 right-0 w-full lg:w-1/4 h-full bg-gray-400 p-4 overflow-auto scrollbar-hide'} >
        <div className="flex pr-2 justify-between">
          <h1 className='font-bold'>Cart Items</h1>
          <button style={{ cursor: "pointer" }} onClick={() => hideCart()} className='outline-none font-bold'>X</button>
        </div>
        <BookContext.Provider value={{ cartData, addCart, removeCart, clearCart }}>
          <div className='relative' >
            <CartItem />
          </div>
        </BookContext.Provider>
      </div>
    </div>
  )
}


function CartItem() {
  let cost = 0;
  const { cartData, addCart, removeCart, clearCart } = useContext(BookContext);
  useEffect(() => {
  }, [cartData])
  return (
    <div>
      {cartData && cartData.map((item, key) => {
        cost += item.count * item.price;
        return (
          <div key={key} className="flex justify-between my-4 mx-2">
            <img className='h-40 w-36' src={`data:image/png;base64,${item.bookImg}`} alt="product" />
            <div className='flex flex-col w-1/3 justify-center self-center '>
              <h4>{item.bookName}</h4>
              <h5>${item.price}</h5>
              <span className="remove-item">remove</span>
            </div>
            <div className='flex flex-col justify-center self-center '>
              <button style={{ cursor: "pointer" }} className='text-xl my-1 rounded-full h-10 px-3 rounded-md font-semibold bg-gray-300' onClick={() => addCart(item)}>^</button>
              <p className="flex justify-center font-semibold text-xl">{item.count}</p>
              <button style={{ cursor: "pointer" }} className='text-xl h-10 px-3 rounded-full font-semibold bg-gray-300' onClick={() => removeCart(item)}>v</button>
            </div>
          </div>
        );
      })
      }
      <div className="abolute flex flex-col justify-center">
        {cartData && <h3 className='self-center'>your total : $<span className=" font-bold">{cost}</span></h3>}
        <button onClick={() => clearCart()} className="self-center mt-1 font-bold border-2 w-1/4 bg-gray-200 rounded-md">clear cart</button>
      </div>
    </div>
  )
}

export default Cart;