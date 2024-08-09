import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder,paymentverification } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/placeOrder",placeOrder);

//this method should be post only coz mentioned in documentation
orderRouter.post("/payment",paymentverification);

export default orderRouter;
