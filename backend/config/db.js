import mongoose from "mongoose";

export const connectDb = async ()=>{
    await mongoose.connect('mongodb+srv://Akshat:Akshat123@cluster0.fhf1w6x.mongodb.net/hungry-soul').then(()=>console.log("Db connected"));
}