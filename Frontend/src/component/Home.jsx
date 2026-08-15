import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Team Appointee</h1>
          <p>Book doctor appointments, select specialists, and manage your health seamlessly online.</p>
          <div className="hero-buttons">
            <Link to="/Appointment" className="btn-primary-home">Book Appointment</Link>
            <Link to="/login" className="btn-secondary-home">Log In / Sign Up</Link>
          </div>
        </div>
      </header>
      <section className="features-section">
        <div className="feature-card">
          <h3>Easy Booking</h3>
          <p>Choose your state, district, and hospital specialization in seconds.</p>
        </div>
        <div className="feature-card">
          <h3>Top Specialists</h3>
          <p>Access clinics, dental care, and dermatologists around Navi Mumbai.</p>
        </div>
        <div className="feature-card">
          <h3>Track History</h3>
          <p>View your upcoming doctor appointment preferences and status.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
