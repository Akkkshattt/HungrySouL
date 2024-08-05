import React, { useState } from "react";
import "./LoginPopup.css"
import { assets } from "../../assets/assets";

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
                <input type="text" placeholder="Enter your name" name="name" id="name" required/>
                }
                <input type="email" name="email" id="email" placeholder="xyz@gmail.com" required/>
                <input type="password" name="password" id="password" placeholder="Enter a strong password" required/>
            </div>
            <button type="submit">{title==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" name="" id="" required/>
                <p>By Continuing , I agree on all the above terms and condition</p>
            </div>
            {title==="Login"
            ?<p>Create a new account ? <span onClick={()=>SetTitle("Sign Up")}>Click Here</span></p>
            : <p>Already have an account ? <span onClick={()=>SetTitle("Login")}>Login</span></p>
            }
         </form>
        </div>
    )
}

export default LoginPopup;