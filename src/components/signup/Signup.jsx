import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const[activeTab,setActiveTab]=useState("signup")

  

      return (
    <div className="signupmain">
      <div className="signupcontainer">
        <div className="signup-left-section">
          <div className="signup-logo-box">
            <img className="tron-logo" src="Component 180[1](1).png" alt="Tron Logo"/>
          </div>
        </div>

        <div className="signup-right-section">
          <div className="signup-form-card">
            <div className="signup-login-and-signup">
              <p className="active">Sign Up</p>
              <p className="inactive">Login</p>
            </div>

            <form>
              <label className="signup-label">Name</label>
              <input
                type="text"
                className="signup-input"
                placeholder="Enter your name"
                required
              />

              <label className="signup-label">Email</label>
              <input
                type="email"
                className="signup-input"
                placeholder="Enter your email"
                required
              />

              <label className="signup-label">Mobile Number</label>
              <input
                type="tel"
                className="signup-input"
                placeholder="Enter your mobile number"
                required
              />

              <label className="signup-label">Password</label>
                <input
                  type="password"
                  className="signup-input password-input"
                  placeholder="Enter your password"
                  required
                />

              <button className="signupbutton" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
