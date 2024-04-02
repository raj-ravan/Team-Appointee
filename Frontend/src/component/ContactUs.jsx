import React from 'react';
import './Contact.css';
import Footer from "./Footer";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission
  };                                                                                           

  return (
    <>
    <div className="bigContainer">
      <div className="container">
        <div className="content">
          <div className="left-side">
            <div className="address details">
              <i className="fas fa-map-marker-alt"></i>
              <div className="topic">Address</div>
              <div className="text-one">
                <a
                  href="https://www.google.com/maps/place/Your+Startup+Address"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (View on Map)
                </a>
              </div>
              <div className="text-two">Hospital Appointee</div>
            </div>
            <div className="phone details">
              <i className="fas fa-phone-alt"></i>
              <div className="topic">Phone</div>
              <div className="text-one">+0098 9893 5647</div>
              <div className="text-two">+0096 3434 5678</div>
            </div>
            <div className="email details">
              <i className="fas fa-envelope"></i>
              <div className="topic">Email</div>
              <div className="text-one">xyz@gmail.com</div>
              <div className="text-two">abc@gmail.com</div>
            </div>
          </div>
          <div className="right-side">
            <div className="topic-text">Send us a message</div>
            <p>
              If you have any work for us or any types of queries, you can send us a message here. It's our pleasure to help you.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <input name="Name" type="text" placeholder="Enter your name" required />
              </div>
              <div className="input-box">
                <input name="email" type="text" placeholder="Enter your email" required />
              </div>
              <div className="input-box message-box">
                <textarea name="message" placeholder="Message here..." required></textarea>
              </div>
              <button type="submit" className="button">Submit</button>
            </form>
          
          </div>
        </div>
      </div>
      
    </div>
    <Footer />
  
  </>
  );
}

export default ContactUs;
