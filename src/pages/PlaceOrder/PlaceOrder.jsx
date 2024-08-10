import React, { useContext,useEffect,useState } from 'react';
import "./PlaceOrder.css";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";


const PlaceOrder = () => {
  const { getTotalcartAmount, url,food_List,cartItems,token} = useContext(StoreContext);
  const navigate = useNavigate();

  //handling state of all the data entered by user
  const [inputdata,setData] = useState({
    firstname :"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const onChangeHanler = (e) =>{
     const name = e.target.name;
     const value = e.target.value;
     setData(inputdata=>({...inputdata,[name]:value}));
  }


  const paymentHandler = async(e) => {
    e.preventDefault();

    //fetching details about amount and quantity of food which we need to pass at backend
    let orderItems =[];
    food_List.map((item)=>{
      if(cartItems[item._id]){
        let iteminfo = item;
        iteminfo["quantity"] = cartItems[item._id];
        orderItems.push(iteminfo);
      }
    
    })
    //console.log(orderItems);
    //fetching razorpay key which we need for payment
    const { data: {key} } = await axios.get(url + "/api/getkey");
    
    let orderdata = {
      userData:inputdata,
      amount:getTotalcartAmount()+9,
      //items:orderItems
    }

    const { data: {order} } = await axios.post(url + "/api/order/placeOrder", {
      amount: getTotalcartAmount() + 9,
      orderdata
      // quantity: 3
    });

    //callback function for payment and then redirecting according to success and failure
    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Hungry Soul",
      description: "A payment method for my web app",
      image: "http://localhost:3000/static/media/Logo.35f45083059da75fadce.jpg",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:4000/api/order/payment",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000"
      },
      notes: {
        "address": "Hungry Soul - Akshat Jain"
      },
      theme: {
        "color": "#F07151"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }

  // const testing = ()=>{
  //    let totalamount = getTotalcartAmount();
  //    console.log("hi from variable",totalamount);
  // }

  //checking if the cart is empty and user still tried to make a payment so redirecting him back to cart page
  useEffect(()=>{
   if(getTotalcartAmount()===0){
    navigate("/cart");
   }
  },[token])

return (
  <form className='place-order' onSubmit={paymentHandler}>
    <div className='place-order-left'>
      <p className='title'>Delivery Information</p>
      <div className="multi-fields">
        <input onChange={onChangeHanler} value={inputdata.firstname} type="text" placeholder='First Name' name='firstname' required/>
        <input onChange={onChangeHanler} value={inputdata.lastname} type="text" placeholder='Last Name' name='lastname' required/>
      </div>
      <input onChange={onChangeHanler} value={inputdata.email} type='email' placeholder='Valid Email' name='email' required/>
      <input onChange={onChangeHanler} value={inputdata.street} type="text" placeholder='Street' name='street' required/>
      <div className="multi-fields">
        <input onChange={onChangeHanler} value={inputdata.city} type="text" placeholder='City' name='city' required/>
        <input onChange={onChangeHanler} value={inputdata.state} type="text" placeholder='State' name='state' required/>
      </div>
      <div className="multi-fields">
        <input onChange={onChangeHanler} value={inputdata.zipcode} type="text" placeholder='Zip-Code' name='zipcode' required/>
        <input onChange={onChangeHanler} value={inputdata.country} type="text" placeholder='Country' name='country' required/>
      </div>
      <input onChange={onChangeHanler} value={inputdata.phone} type="text" placeholder='Phone Number' name='phone'required/>
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
              <p>${getTotalcartAmount() === 0 ? 0 : 9}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalcartAmount() === 0 ? 0 : getTotalcartAmount() + 9}</b>
            </div>
          </div>

          <motion.button
           type='submit'
            // onClick={paymentHandler}
            // onClick={()=>navigate("/order")} 
            whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
            PROCEED TO PAYMENT
          </motion.button>
          {/* <button onClick={testing}>Testing payment</button> */}
        </div>
      </div>
    </div>
  </form>
)
}

export default PlaceOrder;