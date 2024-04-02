import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from '../images/logo.png'

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <img src={logo}/>

          <ul className={click ? "nav-menu activee" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="activee"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/aboutUs"
                activeClassName="activee"
                className="nav-links"
                onClick={handleClick}
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/ContactUs"
                activeClassName="activee"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                exact
                to="/login"
                activeClassName="activee"
                className="nav-links"
                onClick={handleClick}
              >
                Log In / Register
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;