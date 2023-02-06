import React, { useContext, useEffect, useState } from 'react'
import cartImg from "../../assets/cart.png"
import axios from 'axios'
import cartWImg from "../../assets/cartW.png"
import {  useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
function Header({color}) {
    const {showCart,setSearchBook,changeFlag} = useContext(UserContext);
    const img = (color !== "") ? cartImg : cartWImg;
    const value = (color !== "") ? "" : 'text-white';
    const location = useLocation();
    const path = location.pathname;
    const [input,setInput] = useState("");
    const [results, setResults] = useState("");
    const setSelectedBookd = (item) =>{
        setResults("");
        setInput("");
        setSearchBook({item});
        changeFlag();
    }
    const Change = async (e) => {
        if (e.target.value == "") {
            setResults("");
        } else {
            let payload = e.target.value;
            axios.post('/books/search', { payload: payload }).then((res) => res.data).then((data) => { setResults(data.payload) });
        }
    }
    useEffect(() => {
        setResults("");
    }, [path]);
    return (
        <div className='relative w-full mb-1 flex flex-col justify-center justify-item-center'>
            <div className={"Header font-sans lg:pt-2 pt-4 lg:h-20 lg:w-full items-center justify-between lg:px-16 px-10 flex bg-transparent " + value}>
                <div className="logo lg:w-1/4  lg:text-4xl md:text-3xl text-xl italic font-extrabold ">
                    <h1 >Book Store</h1>
                </div>
                {color && <input onKeyUp={(e) => Change(e)} onChange={(e)=> setInput(e.target.value)} value={input} className='outline-none py-1 text-black text-lg bg-transparent lg:w-1/4 w-60 h-7 border-2 border-gray-400 rounded-lg px-2 text-md pt-1 bg-gray-100' type="text" placeholder='search...' />}
                <div className="addCart lg:w-1/4 ">
                    <img style={{ cursor: "pointer" }} className={'mx-auto flex justify-center lg:h-10 md:h-10 sm:h-8'} onClick={(e) => showCart(e)} src={img} alt="" />
                </div>
            </div>
            <div className='absolute self-center top-12 mt-3 w-full z-10 mx-auto'>
                <div className='flex lg:w-1/4 w-60 rounded-md mx-auto self-center bg-gray-500 text-white flex-col z-10'>
                    {
                        results && results.map((item) => {
                            return (
                                <button onClick={()=>setSelectedBookd(item)} className='outline-none text-semibold hover:text-gray-600 hover:bg-white' key={item._id}>{item.bookName}</button>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default Header