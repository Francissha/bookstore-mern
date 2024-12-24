
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from 'react-icons/hi2'; // Import the icon from React Icons
import { IoSearchOutline} from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { IoHeartOutline } from "react-icons/io5";


import avatarImg from "/home/bandaman/bookfreecode/frontend/src/assets/avatar.png"
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';


const navigation = [
    {name: "Dashboard", href:"/dashboard"},// :symbolizes clone
    {name: "Orders", href:"/orders"},
    {name: "Cart Page", href:"/cart"},
    {name: "Check Out", href:"/checkout"},
]

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen]= useState(false)
    //console.log(isDropdownOpen)//confirm it on inspect console section
    
    //to get cart items
    const cartItems = useSelector(state => state.cart.cartItems);
    const {currentUser, logout} = useAuth()

    const handleLogOut = () =>{
      logout()
    }

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* Left side */}
        <div className='flex items-center md:gap-16 gap-4'>
          <Link to="/">
            <HiMiniBars3CenterLeft size={24} /> {/* Add size or other props if necessary */}
          </Link>
          {/* search input*/}
          <div className='relative sm:w-72 w-40'>
          {/* Search Icon */}
            <IoSearchOutline className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
  
          {/* Search Input */}
          <input 
                type="text" 
                   placeholder="search here" 
                    className="bg-[#EAEAEA] w-full py-1 md:pl-10 pl-8 pr-4 rounded-full focus:outline-none"
            />
           </div>
        </div>

       {/* Business Name (Center) */}
<div className="flex justify-center flex-grow">
  <h1 className="text-lg sm:text-2xl font-bold text-center">
    <span className="text-primary">fidmind</span>
  
  </h1>
</div>

        {/* Right side */}
        <div className='relative flex items-center md:space-x-3 space-x-2'>
            <div>
                {
                    currentUser? 
                    <>
                    <button onClick={() =>setIsDropdownOpen(!isDropdownOpen)}>
                    <img src={avatarImg} alt="User Avatar" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`}/>
                    </button>

                    { /*show dropdown*/}
                    {
                        isDropdownOpen &&(
                        <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                            <ul className='py-2'>
                                {
                                    navigation.map((item) => (
                                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                            <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-blue-100'>
                                            {item.name}
                                            </Link>
                                        </li>
                                    ))
                                }
                                <li>
                                <button 
                                onClick={handleLogOut}
                                className='block w-full text-left px-4 py-2 text-sm hover:bg-blue-100'>
                                  Logout</button>
                                </li>
                            </ul>
                        </div>
                        )
                    }

                    </> : <Link to="/login">
                        <HiOutlineUser className='size-6' />
                    </Link>
                }
            </div>

          <button className='hidden sm:block'>
          <IoHeartOutline className='size-6'/> 
          </button>

          <Link to="/cart" className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-md'>
          <HiOutlineShoppingCart className=''/>

          {
            cartItems.length > 0 ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span>
          :<span className='text-sm font-semibold sm:ml-1'>0</span>
          }
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;

