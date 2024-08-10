import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

const [cartItems,SetCartItems] = useState({});  

//creating state of token so that they can be used throughtout the app to validate user
const [token,SetToken] = useState("");

const addTocart =async (itemId)=>{
     if(!cartItems[itemId]){
        SetCartItems((prev)=>({
            ...prev,[itemId]:1
        }))
     }else{
        SetCartItems((prev)=>({
            ...prev,[itemId]:prev[itemId]+1
        }))
     }

    // adding cart item in the database for every user
     if(token){
      await axios.post(url +"/api/cart/add",{itemId},{headers:{token}});
     }
}

const removeFromCart =async (itemId) =>{
    SetCartItems((prev)=>({
        ...prev,[itemId]:prev[itemId]-1
    }))
    //  putting cart item in the database for every user
    if(token){
      await axios.post(url +"/api/cart/remove",{itemId},{headers:{token}});
     }
}

//loading cart data from database coz after loading page data is getting lost but since 
// it is saved in database we can fetch it from there

const loadcartData = async(token)=>{
   //we made this request post coz we wanted to pass header otherwise we could have made it get request as well
  const response  = await axios.post(url + "/api/cart/fetch",{},{headers:{token}});
  SetCartItems(response.data.cartData);
}

//removed async await from here if any error comes do check it
useEffect(()=>{
if(localStorage.getItem("token")){
 loadcartData(localStorage.getItem("token"));
}
},[])

//logic behind calculating the total amount of money 
const getTotalcartAmount = () =>{
  let totalAmount = 0;
  for(const item in cartItems){
    if(cartItems[item]>0){
      let iteminfo = food_List.find((product)=>product._id===item);
      totalAmount += iteminfo.price * cartItems[item];
    }
  }

  return totalAmount;
}

//logic that agar apan refresh kre page ko tab bhi apan logged in rahe ,logout jabhi ho when we actually click the button
useEffect(()=>{
  
  if(localStorage.getItem("token")){
    SetToken(localStorage.getItem("token"));
  }

},[])

//fetching food list  data from backend
const [food_List,SetFoodList] = useState([]);

const fetchFoodList = async ()=>{
  const resposne = await axios.get(url+"/api/food/list");
  SetFoodList(resposne.data.data);
}
useEffect(()=>{
 async function loadFoodData(){
  await fetchFoodList();
 } 
 loadFoodData();
},[])

// useEffect(()=>{
//  console.log(cartItems);
// },[cartItems])

// backend connection url
const url = "http://localhost:4000"

const contextValue = {
   food_List,
   cartItems,
   SetCartItems,
   addTocart,
   removeFromCart,
   getTotalcartAmount,
   url,token,SetToken,SetFoodList
}

return(
  <StoreContext.Provider value={contextValue}>
    {props.children}
  </StoreContext.Provider>
)

}

export default StoreContextProvider;