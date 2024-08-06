import React, { useContext } from 'react';
import "./PlaceOrder.css";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const {getTotalcartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <form className='place-order'>
       <div className='place-order-left'>
         <p className='title'>Delivery Information</p>
         <div className="multi-fields">
          <input type="text" placeholder='First Name'/>
          <input type="text" placeholder='Last Name'/>
         </div>
         <input type='email' placeholder='Valid Email'/>
         <input type="text" placeholder='Street'/>
         <div className="multi-fields">
          <input type="text" placeholder='City'/>
          <input type="text" placeholder='State'/>
         </div>
         <div className="multi-fields">
          <input type="text" placeholder='Zip-Code'/>
          <input type="text" placeholder='Country'/>
         </div>
         <input type="text" placeholder='Phone Number' />
       </div>
       <div className='place-order-right'>
       <div className="cart-total">
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
      </div>
       </div>
    </form>
  )
}

export default PlaceOrder;