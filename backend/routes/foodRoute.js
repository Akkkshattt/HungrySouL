import express from "express"
import {addFood,listFood, removeFood} from "../controllers/foodController.js"
import multer from "multer"; //it basically helps us to create image storage system

//using this we will create any route like get,post,put method;
const foodRouter = express.Router();

//creating the image storage engine using multer package by this any image which we upload from frontend using post request
//will get stored in the uploads folder which we made in directory 
//we will also gave a unique name to each file image as per its add of uploading

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,callback)=>{
        return callback(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage});

//now this route will give call for addfood function in foodController file 
//and this upload method will put images in folder by above logic and will act as middleware
//image is the field name
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);

export default foodRouter;