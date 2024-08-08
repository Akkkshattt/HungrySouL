import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assests/assets'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar' id='sidebar'>
       <div className='sidebar-options'>
           <NavLink to="/add">
           <motion.div whileHover={{scale:1.1}}  whileTap={{scale:1}} className="sidebar-option">
              <img src={assets.add_icon} className='' alt="" />
              <p>Add Item</p>
           </motion.div>
           </NavLink>
           <NavLink to={"/list"}>
           <motion.div whileHover={{scale:1.1}}  whileTap={{scale:1}} className="sidebar-option">
              <img src={assets.order_icon} className='' alt="" />
              <p>List Items</p>
           </motion.div>
           </NavLink>
           <NavLink to={"/orders"}> 
           <motion.div whileHover={{scale:1.1}}  whileTap={{scale:1}} className="sidebar-option">
              <img src={assets.order_icon} className='' alt="" />
              <p>Order Items</p>
           </motion.div>
           </NavLink>
       </div>
    </div>
  )
}

export default Sidebar