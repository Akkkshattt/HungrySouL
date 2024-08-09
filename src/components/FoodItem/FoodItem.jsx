import React, { useContext } from 'react';
import "./FoodItem.css";
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id,name,description,price,image}) => {
   //this was the basic page wise state management but since we want to keep the value of this item count throughout app we will use 
   //context api 
//   const [itemCount,SetItemCount] = useState(0);
//so basically this is how we will be managing state by accessing values from context store 
  const{cartItems,addTocart,removeFromCart,url,token} = useContext(StoreContext);
    
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            {/* dynmaically loading image for food item from database
            {url+"/images/" + image ?
             <img className='food-item-img' src={url+"/images/" + image} alt="" />
             :
             <></>
            } */}
            <img className='food-item-img'  src={url+"/images/" + image} alt="" />
         
         {/* here i did conditional rendering which means add/remove icons will only only come when the user is logged 
         in they wont appear for guest users */}
           {token?
           <>
           {
            !cartItems[id] 
            ? <motion.img whileTap={{scale:0.8}} src={assets.add_icon_white} alt='' title='Add food item' className='add' onClick={()=>addTocart(id)}/>
            : <div className='food-item-counter'>
                <motion.img whileTap={{scale:0.8}} src={assets.remove_icon_red}  onClick={()=>removeFromCart(id)} alt="" />
                <p>{cartItems[id]}</p>
                <motion.img whileTap={{scale:0.8}} src={assets.add_icon_green} onClick={()=>addTocart(id)} alt="" />
            </div>
          }
           </>:<></>}
           
        
        </div>
        
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className='food-item-price'>${price}</p>
        </div>
       
       
    </div>
  )
}

export default FoodItem