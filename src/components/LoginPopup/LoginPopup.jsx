import React, { useContext, useState } from "react";
import "./LoginPopup.css"
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setlogin }) => {
    const [title, SetTitle] = useState("Sign Up")

    const [data, Setdata] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { url, SetToken } = useContext(StoreContext)

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        Setdata(data => ({ ...data, [name]: value }));
    }

    //from here we will connect to backend and validate the user email and password accordingly
    const LoginHandler = async (e) => {
        e.preventDefault();
        let newurl = url;
        if (title === "Login") {
            newurl += "/api/user/login"
        } else {
            newurl += "/api/user/register"
        }
        const resposne = await axios.post(newurl, data);
        if (resposne.data.success) {
            SetToken(resposne.data.token);
            localStorage.setItem("token", resposne.data.token);
            setlogin(false);
        } else {
            alert(resposne.data.message)
            Setdata({
                name: "",
                email: "",
                password: ""
            })
        }
    }

    return (
        <div className="loginform" id="loginform">
            <form onSubmit={LoginHandler} className="loginpopup-container">
                <div className="form-title">
                    <p>{title}</p>
                    <img onClick={() => setlogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {title === "Login" ? <></> :
                        <input type="text" placeholder="Your Name" name="name" onChange={changeHandler} value={data.name} id="name" required />
                    }
                    <input type="email" name="email" onChange={changeHandler} value={data.email} id="email" placeholder="Your Email" required />
                    <input type="password" name="password" onChange={changeHandler} value={data.password} id="password" placeholder="Your Password" required />
                </div>
                <motion.button whileTap={{ scale: 0.9 }} type="submit">{title === "Sign Up" ? "Create Account" : "Login"}</motion.button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required />
                    <p>By clicking on this , I agree on all the above terms and conditions.</p>
                </div>
                {title === "Login"
                    ? <p>Create a new account ? <span onClick={() => SetTitle("Sign Up")}>Click Here</span></p>
                    : <p>Already have an account ? <span onClick={() => SetTitle("Login")}>Login Here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup;