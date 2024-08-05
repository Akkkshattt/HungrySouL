import React, { useState } from 'react';
import "./Navbar.css";
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = ({setlogin}) => {
  const[menu,SetMenu] = useState("Home");

  return (
    <div className='navbar' id='navbar'>
        <Link to={"/"}>
        <motion.div  whileTap={{scale:0.9}} className='navbar-left'>
        <a href="/">Hungry Soul</a>
        <img src={assets.Logo} alt="" className='logo' style={{height:"80px",width:"80px"}} />
        </motion.div>
        </Link>
        <ul className="navbar-menu">
            <motion.li onClick={()=>{SetMenu("Home")}} className={menu==="Home" ?"active" : " "} whileTap={{scale:0.9}}>Home</motion.li>
            <motion.a href="#explore-menu" onClick={()=>{SetMenu("Menu")}} className={menu==="Menu" ?"active" : " "} whileTap={{scale:0.9}}>Menu</motion.a>
            <motion.a href="#appDownload" onClick={()=>{SetMenu("Mobile App")}} className={menu==="Mobile App" ?"active" : " "} whileTap={{scale:0.9}}>Mobile App</motion.a>
            <motion.a href="#footer" onClick={()=>{SetMenu("Contact Us")}} className={menu==="Contact Us" ?"active" : " "} whileTap={{scale:0.9}}>Contact Us</motion.a>
        </ul>
        <div className='navbar-right'>
            <motion.img whileTap={{scale:0.9}} src={assets.search_icon} className='search-icon' alt="" />
            <div className='navbar-search-icon'>
                <motion.img whileTap={{scale:0.9}} src={assets.basket_icon} className='basket' alt="" />
                <div className='dot'></div>
            </div>
            <motion.button 
            whileTap={{scale:0.9}} 
            type='submit'
            onClick={()=>setlogin(true)}
            >
              Sign In</motion.button>
        </div>
    </div>
  )
}

export default Navbar