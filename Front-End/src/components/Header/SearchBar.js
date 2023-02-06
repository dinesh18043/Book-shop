import React from 'react'
import cartImg from "../../assets/cart.png"
import { useNavigate, useLocation } from 'react-router-dom';
function SearchBar({showCart}) {
    const navigate = useNavigate();
    const location = useLocation();
    const NavTO = (item) => {
        console.log(item);
        if (location.pathname === "/") {
            navigate(item);
        } else if (location.pathname === "/" + item) {
            navigate("/")
        } else {
            navigate("/" + item)
        }
    }
    return (
        <div className='searchBar'>
            <div className="left">
                <div className="logo">
                <button onClick={()=>NavTO("admin")}>Logo</button>
                </div>
                <div className="searchEngine" >
                    <input className='lg:text-black text-gray-900 bg-transparent' type="text" placeholder='search....' />
                    <div className="icon ">O</div>
                </div>
            </div>
            <div className="right">
                <div className="addCart">
                    <img onClick={(e)=>showCart(e)} src={cartImg} alt="" srcset="" />
                </div>
            </div>
        </div>
    )
}

export default SearchBar