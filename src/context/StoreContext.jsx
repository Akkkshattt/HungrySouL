import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

const [cartItems,SetCartItems] = useState({});    

const addTocart = (itemId)=>{
     if(!cartItems[itemId]){
        SetCartItems((prev)=>({
            ...prev,[itemId]:1
        }))
     }else{
        SetCartItems((prev)=>({
            ...prev,[itemId]:prev[itemId]+1
        }))
     }
}

const removeFromCart = (itemId) =>{
    SetCartItems((prev)=>({
        ...prev,[itemId]:prev[itemId]-1
    }))
}

//logic behind calculating the total amount of money 
const getTotalcartAmount = () =>{
  let totalAmount = 0;
  for(const item in cartItems){
    if(cartItems[item]>0){
      let iteminfo = food_list.find((product)=>product._id===item);
      totalAmount += iteminfo.price * cartItems[item];
    }
  }
  return totalAmount;
}

useEffect(()=>{
 console.log(cartItems);
},[cartItems])

const contextValue = {
   food_list,
   cartItems,SetCartItems,addTocart,removeFromCart,getTotalcartAmount
}

return(
  <StoreContext.Provider value={contextValue}>
    {props.children}
  </StoreContext.Provider>
)

}

export default StoreContextProvider;