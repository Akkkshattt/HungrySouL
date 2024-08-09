import "dotenv/config.js" //this help us to access the environment variable present in .env file throught the app
import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import Razorpay from "razorpay";

//configuring my app
const app = express();
const port = 4000;

//middleware
app.use(express.json()); //any request which would come from frontend would by first parsed by this middleware coz we want to access
app.use(cors()); //to connect to any frontend
// what is there in req body

//setting up razorpay basic settings
export const instance = new Razorpay({
   key_id: process.env.RAZORPAY_API_KEY,
   key_secret: process.env.RAZORPAY_API_SECRET,
 });
//Database connection
connectDb();

//setting up the routes and end points for food api related requests
app.use("/api/food",foodRouter); //it will call foodRoute file apis
app.use("/images",express.static("uploads"))

//setting up routes and end points for login and register related end points
app.use("/api/user",userRouter);

//setting up routes and end points for user cart related data
app.use("/api/cart",cartRouter);

//setting up endpoint for order placing part
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
   res.send("API is working");
})
 
//for payment we need a razor key in frontend so exporting it from here
app.get("/api/getkey",(req,res)=>{
   res.json({key:process.env.RAZORPAY_API_KEY});
})

app.listen(port,()=>{
console.log(`Server started on http://localhost:${port}`);
})

// mongodb+srv://Akshat:Akshat123@cluster0.fhf1w6x.mongodb.net/?