import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import { instance } from "../server.js";

//placing order from frontend

const placeOrder = async (req, res) => {

   try{
    console.log(req.body);
    const newOrder = new orderModel({
        name: req.body.orderdata.userData.firstname + req.body.orderdata.userData.lastname,
        address: req.body.orderdata.userData.street + req.body.orderdata.userData.city + req.body.orderdata.userData.state + req.body.orderdata.userData.country,
        amount: req.body.amount,
        // items: req.body.items
    })
    console.log(newOrder);
    const options = {
        amount: req.body.amount * 100 * 80,  // amount in the smallest currency unit
        currency: "INR",
        // notes: [{ name: req.body.items.name }]
    };

    const order = await instance.orders.create(options);
    // console.log(order);
    res.json({ success: true, order });

    await newOrder.save();

    //after order is placed we will remove items from user cart
    await userModel.findById(req.body.userId, { cartData: {} });
    // console.log(order);

    res.json({ success: true, message: "Order Placed!", order })
   }
   catch(error){

   }

    // const options = {
    //     amount:50000,  // amount in the smallest currency unit
    //     currency: "INR",
    // };

}

//ye tab run hoga jab actual payment kr dega customer so according to  success and failure vo different pages pr direct hoga
//after verification
//this route is running because of callback url
const paymentverification = async (req, res) => {
    console.log(req.body);
    res.redirect("http://localhost:3000/success");
    //after redirecting after writing this which was crashing my app and was giving me errors cannot set headers after redirecting 
    //thats why had to comment this part
    // res.json({success:true});
}


export { placeOrder, paymentverification };