import React from "react";
import playStore from "../images/image_footer/playstore.png";
import appStore from "../images/image_footer/Appstore.png";
import insta from "../images/image_footer/instagram.png"
import linked from "../images/image_footer/linkedin.png"
import github from "../images/image_footer/github.png"
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>HOSPITAL APPOINTEE</h1>
        <p>Elevating Your Business to new heights</p>

        <p>Copyrights 2021 &copy;</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href=""><img src={insta} />  Instagram</a>
        <a href=" "><img src = {linked } />  LinkedIn</a>
        <a href=""><img src = {github } />  Git Hub</a>
      </div>
    </footer>
  );
};

export default Footer;