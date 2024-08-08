import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next)=>{
 //first we are fetching tokens from header
 const {token} = req.headers;
 if(!token){
    return res.json({success:false,message:"Not authorized user,Login first!"});
 }
 //now if the token is fetched
 try {
    //decoding the token and matching it with the secret key which we provided
    const decode_token  = jwt.verify(token,process.env.JWT_SECRET);
    //now when we created a token for each user we passed his id now with token we will fetch that id
    req.body.userId = decode_token.id;
    // now with the help of this userid we fetched above we will add items to his cart
    next();
 } catch (error) {
    return res.json({success:false,message:"Something wrong happened while authenticating user"});
 }
}

export default authMiddleware;