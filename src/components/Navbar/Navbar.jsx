import React, { useContext, useState } from 'react';
import "./Navbar.css";
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setlogin }) => {
  const [menu, SetMenu] = useState("Home");
  const { getTotalcartAmount, token, SetToken } = useContext(StoreContext);

  //adding the logout functionality
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    SetToken("");
    navigate("/");
  }
  const navgigatetoOrders = ()=>{
    navigate("/myorders");
  }

  return (
    <div className='navbar' id='navbar'>
      <Link to={"/"}>
        <motion.div whileTap={{ scale: 0.9 }} className='navbar-left'>
          <a href="/">Hungry Soul</a>
          <img src={assets.Logo} alt="" className='logo' style={{ height: "80px", width: "80px" }} />
        </motion.div>
      </Link>
      <ul className="navbar-menu">
        <Link to="/"><motion.li onClick={() => { SetMenu("Home") }} className={menu === "Home" ? "active" : " "} whileTap={{ scale: 0.9 }}>Home</motion.li></Link>
        <motion.a href="#explore-menu" onClick={() => { SetMenu("Menu") }} className={menu === "Menu" ? "active" : " "} whileTap={{ scale: 0.9 }}>Menu</motion.a>
        <motion.a href="#appDownload" onClick={() => { SetMenu("Mobile App") }} className={menu === "Mobile App" ? "active" : " "} whileTap={{ scale: 0.9 }}>Mobile App</motion.a>
        <motion.a href="#footer" onClick={() => { SetMenu("Contact Us") }} className={menu === "Contact Us" ? "active" : " "} whileTap={{ scale: 0.9 }}>Contact Us</motion.a>
      </ul>
      <div className='navbar-right'>
        <motion.img whileTap={{ scale: 0.9 }} src={assets.search} className='search-icon' alt="" />

        {!token ?

          <div className='navbar-search-icon' title='Login first'>
            <motion.img whileTap={{ scale: 0.9 }} src={assets.g2_cart} className='basket' alt="" />
            <div className={getTotalcartAmount() === 0 ? "" : "dot"}></div>
          </div>

          :
          <Link to='/cart'>
            <div className='navbar-search-icon'>
              <motion.img whileTap={{ scale: 0.9 }} src={assets.g2_cart} className='basket' alt="" />
              <div className={getTotalcartAmount() === 0 ? "" : "dot"}></div>
            </div>
          </Link>
        }

        {/* <Link to='/cart'>
            <div className='navbar-search-icon'>
                <motion.img whileTap={{scale:0.9}} src={assets.g2_cart} className='basket' alt="" />
                <div className={getTotalcartAmount()===0?"" :"dot"}></div>
            </div>
            </Link> */}


        {!token ?
          <motion.button whileTap={{ scale: 0.9 }} type='submit' onClick={() => setlogin(true)}>
            Sign In
          </motion.button>
          :
          <div className='navbar-profile'>
            <img src={assets.profile} alt="" className='profile' />
            <ul className='navbar-profile-dropdown'>
              <motion.li whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
                <img src={assets.bag} alt="" className='profile_bag' />
                <p onClick={navgigatetoOrders}
                >Orders</p>
              </motion.li>
              <hr />
              <motion.li whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} onClick={logout}>
                <img src={assets.logout} alt="" className='logout' />
                <p>Logout</p>
              </motion.li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar