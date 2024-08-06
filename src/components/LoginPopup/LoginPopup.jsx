import React, { useState } from "react";
import "./LoginPopup.css"
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

const LoginPopup = ({setlogin}) => {
    const [title,SetTitle] = useState("Sign Up")

    return(
        <div className="loginform" id="loginform">
         <form action="" className="loginpopup-container">
            <div className="form-title">
                  <p>{title}</p> 
                  <img onClick={()=>setlogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {title==="Login" ? <></> :
                <input type="text" placeholder="Your Name" name="name" id="name" required/>
                }
                <input type="email" name="email" id="email" placeholder="Your Email" required/>
                <input type="password" name="password" id="password" placeholder="Your Password" required/>
            </div>
            <motion.button whileTap={{scale:0.9}} type="submit">{title==="Sign Up"?"Create Account":"Login"}</motion.button>
            <div className="login-popup-condition">
                <input type="checkbox" name="" id="" required/>
                <p>By clicking on this , I agree on all the above terms and conditions.</p>
            </div>
            {title==="Login"
            ?<p>Create a new account ? <span onClick={()=>SetTitle("Sign Up")}>Click Here</span></p>
            : <p>Already have an account ? <span onClick={()=>SetTitle("Login")}>Login Here</span></p>
            }
         </form>
        </div>
    )
}

export default LoginPopup;