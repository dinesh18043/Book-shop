import React from 'react'
import cartImg from '../../assets/addcart.png'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../UserContext/UserContext'
function Card({ item }) {
    const { changeFlag, showCart, cartData} = useContext(UserContext);
    const addCart = async (item) => {
        await axios.post("/cart/add", { item: item }).catch((err) => console.log(err));
        changeFlag();
    }
    const buyBook = async (item) => {
        var selectedObject = cartData.filter((book) => item._id == book._id);
        if (!selectedObject.length) {
            addCart(item);
        }
        showCart();

    }
    return (
        <div id={item._id} className="flex w-full hover:bg-gray-100 hover:ease-in hover:delay-300 pb-4 rounded-md flex-col">
            <img className='h-80 px-4 pt-4 pb-1' src={`data:image/png;base64,${item.bookImg}`} />
            <h4 className='self-center font-semibold text-xl'>{item.bookName}</h4>
            <p className='self-center text-lg'>${item.sellingPrice}</p>
            <div className="flex justify-around">
                <button style={{ cursor: "pointer" }} onClick={() => buyBook(item)} className='text-xl h-10 px-5 rounded-md font-semibold hover:bg-gray-300'>Buy</button>
                <button style={{ cursor: "pointer" }} onClick={() => addCart(item)} className='text-xl h-10 px-5 rounded-md font-semibold hover:bg-gray-300'><img className='h-8' src={cartImg} alt="" /></button>
            </div>
        </div>
    )
}

export default Card;