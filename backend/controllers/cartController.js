import e from "express";
import userModel from "../model/userModel.js";

//add items to cart according to particular user id
const addToCart = async(req,res)=>{
 try{
  //finding user based on the id which we got from middleware 
  const userData = await userModel.findById({_id:req.body.userId})
  //fetching cart details of user
  const cartData = await userData.cartData;
  if(!cartData[req.body.itemId]){
    //if cart is empty for particular item id so we are initializing it
    cartData[req.body.itemId] = 1;
  }else{
    cartData[req.body.itemId] += 1;
  }
  await userModel.findByIdAndUpdate(req.body.userId,{cartData});
  res.json({success:true,message:"Item added to cart"})
}
catch(error){
 console.log(error);
 res.json({success:false,message:"Failed to add item to cart"})
}
}

//remove items from cart
const removeFromCart = async(req,res)=>{
  try {
    const userData =await userModel.findById({_id:req.body.userId});
    const cartData =await userData.cartData;
    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Item removed from cart"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Failed to remove item to cart"})
  }
}

//fetching items from cart
const fetchItemsfromCart = async(req,res)=>{
 try{
    const userData =await userModel.findById({_id:req.body.userId});
    const cartData =await userData.cartData;  
    res.json({success:true,cartData});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Failed to fetch data from the cart"})
  }
}

export {addToCart,removeFromCart,fetchItemsfromCart}