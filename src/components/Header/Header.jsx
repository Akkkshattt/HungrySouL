import React from 'react';
import "./Header.css";
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Order Your Favourite Food Here</h2>
                <p>Get your favorite food delivered right to your doorstep! Hungry Soul allows you to order from a wide variety of cuisines, from juicy burgers to spicy curries, and everything in between. Simply browse through our menu, select your desired dishes, and pay securely online</p>
                <motion.button whileTap={{scale:0.9}} type='submit'>Order Now</motion.button>
            </div>
        </div>
    )
}

export default Header