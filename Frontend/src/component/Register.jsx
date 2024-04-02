import React, { useEffect, useState } from "react";
import registerrr from '../images/images.png';
import Axios from 'axios';
import './register.css';
import { useLocation } from 'react-router-dom';
import Otp_page from "./Otp_page";


const Register = () => {
  const [usernamereg, setusernamereg] = useState('');
  const [verifiedNumber, setVerifiedNumber] = useState('');
  const [emailreg, setemailreg] = useState('');
  const [passreg, setpassreg] = useState('');
  const [confirmpassreg, setconfirmpassreg] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess,setRegistrationSuccess] = useState(false);

  const location = useLocation();
  const phone = location.state.phone; // Access phone number from the location state

  useEffect(() => {
    if (phone) {
      setVerifiedNumber(phone); // Set the verified phone number in the state
    }
  }, [phone]);

  const register = (e) => {
    e.preventDefault();
    console.log("inside register");
    // Check if password and confirm password match
    if (passreg !== confirmpassreg) {
      setPasswordMatch(false);
      return;
    }
    Axios.post('http://localhost:4000/register', {
      fullname : usernamereg,
      verifiedNumber: verifiedNumber,
      email: emailreg,
       password: passreg,
      
    }).then((response) => {
      console.log(response);
    });
  }

  // Handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    setconfirmpassreg(e.target.value);
    setPasswordMatch(passreg === e.target.value);
  }

  // Toggle show password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <>
      {registrationSuccess && (
        <div className="registration-success-alert">
          Registration successful! You can now log in.
        </div>
      )}

      <div className="login">
        <img src={registerrr} className="avatar" />
        <h1>Sign Up Here</h1>
        <form onSubmit={register} name="Register" method="post">
          <label>Full Name</label>
          <input
            id="uN"
            type="text"
            name="Full name"
            placeholder="Enter Full name"
            onChange={(e) => {
              setusernamereg(e.target.value);
            }}
          />
          <label>Phone Number</label>
          <input
            id="phoneno"
            type="tel"
            name="PhoneNo"
            placeholder="Enter phone number"
            value={verifiedNumber}
            onChange={(e) => {
              setVerifiedNumber(e.target.value);
            }}
            readOnly
          />

          <label>Email</label>
          <input
            id="eM"
            type="email"
            name="email"
            placeholder="Enter your Email"
            onChange={(e) => {
              setemailreg(e.target.value);
            }}
          />
          <label>Password</label>
          <div className="password-field">
            <input
              id="pW"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              onChange={(e) => {
                setpassreg(e.target.value);
              }}
            />
            <button
              className="show-password-button"
              type="button"
              onClick={toggleShowPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <label>Confirm Password</label>
          <input
            id="pW"
            type="password"
            name="confirmpwd"
            placeholder="Confirm password"
            onChange={handleConfirmPasswordChange}
          />

          {!passwordMatch && <p className="error-message">Passwords do not match.</p>}

          <input onClick={register} type="submit" value="Register" name="signup" />
        </form>
      </div>
    </>
  );
}

export default Register;
