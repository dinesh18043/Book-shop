import React, { useContext, useState } from 'react'
import filterImg from '../../assets/filter.png'
import { navLinks } from '../../assets/Globalconstants/GlobalConstants'
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar({ priceRange,setSearchBook }) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [display, setDisplay] = useState('hidden');
  const NavTO = (item) => {
    setSearchBook("");
    console.log(item);
    setDisplay('hidden');
    if (item === 'Home') {
      if (path !== '/') {
        navigate('/');
      }
    } else if (path !== '/' + item.toLowerCase()) {
      navigate("/" + item.toLowerCase());
    }
  }
  const showFilter = () => {
    if (display === 'hidden') {
      setDisplay('block');
    } else {
      setDisplay('hidden');
    }
  }
  return (
    <div className='relative lg:w-1/5 w-full'>
      <div className="absolute navBar justify-between lg:pb-28  lg:px-0 px-10 flex lg:flex-col w-full py-3 lg:py-0 p-2 bg-gray-100">
        <img onClick={() => showFilter()} className='lg:hidden h-8' src={filterImg} alt="=" />
        <div className="hidden lg:block">
          <Filter priceRange={priceRange} path={path} NavTO={NavTO} />
        </div>
      </div>
      <div className={display + " lg:hidden flex flex-col rounded-md absolute  top-0 left-3 right-3 bg-gray-300"}>
        <button style={{ cursor: "pointer" }} className='self-end pt-3 mx-6 outline-none' onClick={() => showFilter()} >X</button>
        <Filter priceRange={priceRange} path={path} NavTO={NavTO} />
      </div>
    </div>
  )
}
const Filter = ({ priceRange, path, NavTO }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3000);
  return (
    <div className="books flex flex-col">
      <h2 className='font-semibold text-xl pl-5 pt-3 pb-1 '>Category</h2>
      <div>
        {
          navLinks.map((item, key) => {
            const value = path.slice(1) === item.toLowerCase() ? 'lg:bg-gray-300' : '';
            return (
              <button key={key} className={'hover:bg-gray-300 py-2 px-4 outline-none text-lg w-full self-start ' + value} onClick={() => NavTO(item)}>{item}</button>
            );
          })
        }
      </div>
      <div className='px-5 pt-5'>
        <h2 className='font-semibold text-xl mb-1'>Price</h2>
        <div className="flex flex-col px-4 pl-2">
          <div className=" flex flex-col">
            <label>Min : {min}</label>
            <input type="range" min={0} max={1200} onChange={(e) => setMin(e.target.value)} defaultValue={min} />
          </div>
          <div className="flex flex-col">
            <label>Max : {max}</label>
            <input type="range" min={500} max={3000} onChange={(e) => setMax(e.target.value)} defaultValue={max} />
          </div>
          <button onClick={() => priceRange(min, max)} className='border-2 bg-gray-300 mx-8 mt-2'>Apply</button>
        </div>
      </div>
    </div>
  )
}


export default NavBar



