import React, { useContext } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';


const FoodDisplay = ({category}) => {
  const {food_List} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
        <h1>Some Of Our Most Ordered Food Items</h1>
        <div className="food-display-list">
             {food_List.map((item,index)=>{
                if(category==="All" || category === item.category){
                return (
                <FoodItem key={index} id={item._id} name={item.name} description={item.description} image={item.image} price={item.price}/>
                ) 
            }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay