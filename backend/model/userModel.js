import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}} //to store use cart details ,by default we gave it no value
},{minimize:false})

//we gave this minimize false because we haven't provided any data inside cartData so it wont add that inside our schema so to add it 
//gave false value to it

const userModel = mongoose.model.user || mongoose.model("user",userSchema);

export default userModel;