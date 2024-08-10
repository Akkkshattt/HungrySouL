import React from 'react'
import "./Verify.css"
import { motion } from 'framer-motion'
import {Link } from 'react-router-dom'
import { assets } from '../../assets/assets'


const Verify = () => {
  
  return (
    <div className='verify' id='verify'>
        <div className="success">
            <div className='order-box'>
                <img src={assets.parcel_icon} alt="" />
                 <p>Your food order has been placed , we will be coming to deliver it soon</p>
                <Link to={"/"}>
                <motion.button whileTap={{scale:0.9}} whileHover={{scale:1.1}}>Move to Home Page</motion.button>
                </Link> 
            </div>
            <div>
            </div>
        </div>
    </div>
  )
}

export default Verify