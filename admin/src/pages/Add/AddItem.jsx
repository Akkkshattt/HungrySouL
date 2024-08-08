import React, { useState } from 'react'
import "./AddItem.css"
import { assets } from '../../assests/assets'
import { motion } from 'framer-motion'
import axios from "axios"
import {toast} from "react-toastify"

const AddItem = () => {
  const url = "http://localhost:4000";
  //by this state we are basically managing the upload image state
  const[image,SetImage] = useState(false);
  //by this state we are managing the input fields data
  const[data,SetData] = useState({
    name:"",
    description:"",
    category:"Salad",
    price:""
  })

  //this function is helping us to update the data entered by the admin
  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    console.log(name,value);
    SetData(data=>({...data,[name]:value}))
  }


  const submitHandler = async(e) => {
     e.preventDefault();
     //FormData is an interface in javascript which helps us to create key value pairs object
     const formData = new FormData();
     formData.append("name",data.name);
     formData.append("description",data.description);
     formData.append("price",data.price);
     formData.append("category",data.category);
     formData.append("image",image);

     //posting data on database using axios and since we are adding data we will use post method
     const response = await axios.post(`${url}/api/food/add`,formData);
     if(response.data.success){
      //will set everything to default when the data is added successfully
      SetData({
        name:"",
        description:"",
        category:"Salad",
        price:""
      });
      SetImage(false);
      //with the help of this i showed notification at the top of page
      //this message which is getting displayed is coming from backend
      toast.success(response.data.message);
     }else{
      toast.error(response.data.message);
     }
  }

  return (
    <div className="add">
      <form className='flex-col' onSubmit={submitHandler}>
        <div className='add-image-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor="image">
            {/* we are using state to show the current image uploaded by the admin this functionality*/}
            <img src={image?URL.createObjectURL(image):assets.upload_area} title='Upload Food Image' alt="" />
          </label>
          <input onChange={(e)=>SetImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-produuct-name">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' required placeholder='Enter food item name'/>
        </div>
        <div className="add-product-description flex-col">
          <p>Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Write description about food item here'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" id="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' required placeholder='$20'/>
          </div>
        </div>
        <motion.button whileTap={{scale:0.9}} type='submit' className='add-btn'>Add Food Item</motion.button>
      </form>
    </div>
  )
}

export default AddItem