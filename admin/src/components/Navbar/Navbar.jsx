import React from 'react'
import "./Navbar.css"
import { assets } from '../../assests/assets'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'


const Navbar = () => {
  return (
    <div className='navbar' id='navbar'>
        <Link to={"/"}>
        <motion.div whileTap={{scale:0.9}} className='logo-panel'>
        <img src={assets.Logo} className="logo" alt="" />
        <p>Hungry Soul</p>
        </motion.div>
        </Link>
       <motion.img whileTap={{scale:0.9}} src={assets.profile_image} className='profile' alt="" />
    </div>
  )
}

export default Navbar