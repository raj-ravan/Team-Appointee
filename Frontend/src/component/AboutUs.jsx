import React from 'react'
import Raj from "../images/Raj_profile.jpg"
import Akanksha from "../images/Akanksha_profile.jpg"
import Jatin from "../images/Jatin_profile.jpg"
import './aboutUs.css'
import Footer from "./Footer";


const AboutUs = () => {
    return (
        <>
        
            <div className="aboutcss">
                <h1 className="team-heading">Meet Our Team</h1>

                <div className="column" >
                    <div className="card">
                        <div className="detail">
                            <img src={Jatin} alt="" className="circular-img" />
                            <div className='imp'>
                            </div>
                        </div>
                        <div className="containerabout">
                            <h2>Jatin Yadav</h2>
                            <p className="title">Founder</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <div className="social-media">

                                <a href="#"><i className="fab fa-facebook"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="detail">
                            <img src={Raj} alt="" className="circular-img" />
                            <div className='imp'>
                            </div>
                        </div>

                        <div className="containerabout">
                            <h2>Raj Narayan</h2>
                            <p className="title">Founder</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <div className="social-media">
                                <a href="#"><i className="fab fa-facebook"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="detail">
                            <img src={Akanksha} alt="" className="circular-img" />
                            <div className='imp'>
                            </div>
                        </div>
                        <div className="containerabout">
                            <h2>Akanksha Srivastava</h2>
                            <p className="title">Founder</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <div className="social-media">
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AboutUs;