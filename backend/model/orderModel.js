//to store the data about all the orders placed
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    // items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:String,required:true},
    status:{type:String,default:"Food Processing"},
    payment:{type:String,default:true},
    date:{type:Date,default:Date.now()}
})

const orderModel = mongoose.model.Order || mongoose.model("Order",orderSchema);

export default orderModel;