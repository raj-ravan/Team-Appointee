import React, { useState, useEffect } from "react";
import loginn from "../images/image.png";
import Axios from "axios";
import "./login.css";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from './firebase.js';

const Login = () => {
  const [verifiedNumber, setverifiedNumber] = useState("");
  const [password, setpassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  // const navigate = useNavigate();
  const handleForgotPassword = () => {
    // Implement the logic for handling the "Forgot Password" feature here
    console.log("Forgot Password");
  };

  const login = (e) => {
    // const navigate = useNavigate();

    e.preventDefault();
    console.log("inside login");
    Axios.post("http://localhost:4000/login", {
      verifiedNumber: verifiedNumber,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
        window.alert("Login successful"); // Show an alert for successful login
      }
    });
  };

  const handleLoginWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // Handle the successful login with Google here
        const user = result.user;
        console.log("Google login successful:", user);
      })
      .catch((error) => {
        // Handle errors during Google login here
        console.log("Google login error:", error);
      });
  };

  return (
    <div className="LoginContainer">
      <div className="login">
        <img src={loginn} className="avatar" alt="Login Avatar" />
        <h1>LOGIN HERE</h1>
        <form name="Register" method="POST" onSubmit={login}>
          <label> Phone Number </label>
          <input
            id="uN1"
            type="textlogin"
            name="verifiedNumber"
            placeholder="Enter Phone Number"
            onChange={(e) => {
              setverifiedNumber(e.target.value);
            }}
          />

          <label> Password </label>
          <input
            id="pW1"
            type="passwordlogin"
            name="password1"
            placeholder="Enter password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
             <br />
            
             <br />

          <button className="login_btn" onClick={login}> LOGIN </button>
          <a href="otp_page" onClick={handleForgotPassword}>
            Forgot Password?
          </a>
          <br></br>
          <div className="signup-login-divider">
            <a href="Otp_page"><h4>SIGN UP / REGISTER</h4></a>
            <span className="or">
              <h4>OR</h4>
            </span>
            
           {/* Add Login with Google button */}
           <div className="App">
      <button class="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <h1>{localStorage.getItem("name")}</h1>
      </div>
            {/* <button
              href="#"
              className="login-provider-button"
              onClick={handleLoginWithGoogle}
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
                alt="google icon"
              />
              <span>Continue with Google</span>
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
