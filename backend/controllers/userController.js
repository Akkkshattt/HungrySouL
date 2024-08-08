import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import validator from "validator";

//creating jwt token based on every user id
const createtoken = (id)=>{

    //when i didnt passed any secret key i got a error that secretorprivate key must have a value
    return jwt.sign({id},process.env.JWT_SECRET);
}



const registerUser = async(req,res) =>{
   const{name,password,email} = req.body;
   try{
   //checking if email entered already exists in database or not
   const exists = await userModel.findOne({email});
   if(exists){
     return res.json({success:false,message:"User already exists!"});
   }
   // Validating format of email and strong password
   //for that we will use the validator package
   if(!validator.isEmail(email)){
    return res.json({success:false,message:"Please enter a valid email!"});
   }
   if(password.length <8){
    return res.json({success:false,message:"Please enter a strong password of atleast 8 characters!"});
   }
    
   //after all this checks we will create a account

   //before this we will encrypt the password
   const salt = await bycrypt.genSalt(10);
   const hashedPass = await bycrypt.hash(password,salt);

   //now creating a user data to save in database are validating and creating hashed pass
   const newUser = new userModel({
      name:name,
      email:email,
      password:hashedPass,
   })

   //saving data in database
   const user = await newUser.save();
   const token = createtoken(user._id);
   res.json({success:true,token});
   } catch(error){
       console.log(error);
       res.json({success:false,message:"Something went wrong while registering user"})
   }
}
//function and logic for login user
const loginUser =async(req,res) =>{
    const {email,password} = req.body;
    try {
        //finding if there is any user with this email
        const user = await userModel.findOne({email});

        //if not found
        if(!user){
            return res.json({success:false,message:"User doesn't exist,Create an account"})
        }
        //comparing user entered password and password saved in database
        const isMatch = await bycrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"The key you provided doesn't unlock our doors. Try again!!"})
        }
        const token = createtoken(user._id);
        res.json({success:true,token});
      
    } catch (error) {
        console.log(error);
       res.json({success:false,message:"Something went wrong try again!"})
    }
}


export {loginUser,registerUser};