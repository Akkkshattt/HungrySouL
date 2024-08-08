import foodModel from '../model/foodModel.js';
import fs from 'fs';

//adding food item function
const addFood = async (req,res)=>{

    //name of the image file we will store in db coz we cant store actual image thats why i stored in uploads folder using multer
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        //saving data in database
     await food.save();
     res.json({success:true,message:"Food item added successfully!"})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Failed to add food item!"}) 
    }
}

const listFood = async(req,res)=>{
try {
    const foods = await foodModel.find({});
    res.json({success:true,data:foods})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
}
}

const removeFood = async(req,res) =>{
   try {
    //finding item we want to delete its image,by fetching its unique id from database
    const food = await foodModel.findById(req.body.id);
    //removing food item image from uploads folder
    fs.unlink(`uploads/${food.image}`,()=>{})

    //actual deleting the food item from database
    await foodModel.findByIdAndDelete(req.body.id); 
    res.json({success:true,message:"Food item removed successfully!"})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Failed to remove food item!"})
   }
} 

export {addFood,listFood,removeFood};