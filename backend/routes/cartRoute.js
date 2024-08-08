import express from "express"
import { addToCart,removeFromCart,fetchItemsfromCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);
cartRouter.post("/fetch",authMiddleware,fetchItemsfromCart);

export default cartRouter;