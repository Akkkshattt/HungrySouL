import React , {useEffect, useState} from 'react'
import "./ListItem.css"
import axios from "axios";
import {toast} from "react-toastify"
import {motion} from "framer-motion";

const ListItem = () => {
  const url = "http://localhost:4000";
  
  const [list,Setlist] = useState([]);

  //fetching data from database
  const fetchList = async ()=>{
    const response  = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);
    if(response.data.success){
        Setlist(response.data.data)
    }else{
      toast.error("Error");
    }
  }

  //method to remove food item from database after clicking on that "-" button I made
  const removeItem = async (foodId)=>{
    // console.log(foodId);
    //we have to send id like this separatley coz we dont need to write this id in url we have to pass this id in post req body
    const response = await axios.post(`${url}/api/food/remove` ,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }

  useEffect(()=>{
    //we want to fetch list everytime we refresh the page
    fetchList();
  },[])
  return (
    <div className='list add flex-col'>
      <p>List of all the food items</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p className="headings">Image</p>
          <p className="headings">Name</p>
          {/* <p className="headings">Description</p> */}
          <p className="headings">Category</p>
          <p className="headings">Price</p>
          <p className="headings">Action</p>
        </div>
        {list.map((item,index)=>{
          return(
            <>
            <div key={index} className="list-table-format">
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <motion.p onClick={()=>removeItem(item._id)} whileTap={{scale:0.9}} whileHover={{scale:1.1}} className='cross'>-</motion.p>
            </div>
            </>
          )
        })}
      
      </div>
    </div>
  )
}

export default ListItem