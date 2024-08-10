import React, { useContext} from 'react';
import "./Cart.css";
import { StoreContext } from '../../context/StoreContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { food_List, cartItems, removeFromCart,getTotalcartAmount,url } = useContext(StoreContext);
  const navigate = useNavigate();
 
  return (
    <div className='cart' id='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_List.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div key={index} className='cart-items-title cart-items-item'>
                  <img src={url+"/images/" + item.image} alt="" />    
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <motion.p whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => removeFromCart(item._id)} className='cross' title='Remove food item'>-</motion.p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total Amount</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalcartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${getTotalcartAmount()===0?0:9}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalcartAmount()===0?0:getTotalcartAmount() + 9}</b>
            </div>
          </div>
       
        <motion.button onClick={()=>navigate("/order")} whileTap={{scale:0.9}} whileHover={{scale:1.1}}>PROCEED TO CHECKOUT</motion.button>
      </div>
      <div className='cart-promocode'>
        <div>
          <p>If you have a promo code enter it here!</p>
          <div className='cart-promocode-input'>
            <input type='text' placeholder='Enter promocode here' />
            <button>Submit</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Cart