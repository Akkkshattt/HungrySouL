import React from 'react';
import "./ExploreMenu.css";
import { menu_list } from '../../assets/assets';
import { motion } from 'framer-motion';

const ExploreMenu = ({category,SetCategory}) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>See What's Cooking</h1>
            <p className='explore-menu-text'>Browse our menu for a variety of delicious options, from classic comfort food to international flavors. We've got something for everyone! Order now and enjoy your favorite dishes delivered or picked up at your convenience.</p>
            <motion.div className="explore-menu-list">
                {menu_list.map((item,index)=>{
                    return(
                        <motion.div 
                        //basically this is how we are trying to create a filter for selecting a particular food item 
                        // and for this we are going to use props which has been passed from Home.jsx page.

                        //During this i faced a basic error that is typo mistake : from Home component while passing prop i used
                        //SetCategory with c as capital and here i destructured it as Setcategory and just because of this it wasnt working
                        //fine.
                        onClick={()=>SetCategory(prev=>prev===item.menu_name?"All":item.menu_name)} 
                        whileTap={{scale:0.9}} 
                        key={index} 
                        className='explore-menu-list-item'>
                           <img
                           className={category===item.menu_name ? "active": ""} 
                           src={item.menu_image} alt="" />
                           <p  className={category===item.menu_name ? "text": ""}>{item.menu_name}</p>
                        </motion.div>
                    )
                })}
            </motion.div>
            <hr />
        </div>
    )
}

export default ExploreMenu