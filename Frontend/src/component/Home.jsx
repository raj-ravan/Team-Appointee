import React from "react";
import "./Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Faq from "react-faq-component";
import Footer from "./Footer";
import TestiMonials from './TestiMonials/TestiMonials';


const Home = () => {
  const navigate = useNavigate();
  const appointmentbnt = (e) => {
    navigate("/appointment");
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = () => {
    setCurrentIndex((currentIndex + 1) % photos.length);
  };
  const prev = () => {
    setCurrentIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  const photos = [
    {
      id: "p1",
      url: "https://www.kindacode.com/wp-content/uploads/2022/08/1.png",
    },
    {
      id: "p2",
      url: "https://www.kindacode.com/wp-content/uploads/2022/08/2.png",
    },
    {
      id: "p3",
      url: "https://www.kindacode.com/wp-content/uploads/2022/08/3.jpg",
    },
    {
      id: "p4",
      url: "https://www.kindacode.com/wp-content/uploads/2022/08/4.jpg",
    },
  ];
  const data = {
    title: "FAQ (Frequently Asked Question..)",
    rows: [
      {
        title: "Lorem ipsum dolor sit amet,",
        content: "Lorem ipsum dolor sit amet, consectetur ",
      },
      {
        title: "Nunc maximus, magna at ultricies elementum",
        content:
          "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam.",
      },
      {
        title: "Curabitur laoreet, mauris vel blandit fringilla",
        content:
          "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc",
      },
      {
        title: "What is the package version",
        content: "v1.0.5",
      },
    ],
  };
  return (
    <>
      <div className="HomeContainer">
       
          <div className="slider-container">
            {photos.map((photo) => (
              <div
                key={photo.id}
                // if the photo is the current photo, show it
                className={
                  photos[currentIndex].id === photo.id ? "fade" : "slide fade"
                }
              >
                <img src={photo.url} alt={photo.title} className="photo" />
                <div className="caption">{photo.title}</div>
              </div>
            ))}

            {/* Previous button */}
            <button onClick={prev} className="prev">
              &lt;
            </button>

            {/* Next button */}
            <button onClick={next} className="next">
              &gt;
            </button>

            {/* Render dots indicator */}
            <div className="dots">
              {photos.map((photo) => (
                <span
                  key={photo.id}
                  // highlight the dot that corresponds to the current photo
                  className={
                    photos[currentIndex].id === photo.id ? "dot active" : "dot"
                  }
                  // when the user clicks on a dot, go to the corresponding photo
                  onClick={() => setCurrentIndex(photos.indexOf(photo))}
                ></span>
              ))}
            </div>

            <div className="btnss">
              <button className="btns" onClick={appointmentbnt}>
                Appointment
              </button>
              <button className="btns">Status / Cancel</button>
              <button className="btns">History</button>
            </div>
          </div>
          <div className="home_content">
            {/* <h1> */}
            Hospital Apointee helps you with
            {/* </h1> */}
          </div>
          <div className="mega-container">
            <div className="container_ak">
              <div className="box">
                <div className="icon">
                  <i className="fa fa-credit-card" aria-hidden="true"></i>
                </div>
                <div className="content">
                  <h3>Payment</h3>
                  <p>Go to payment section to check your latest payment </p>
                </div>
              </div>
            </div>
            <div className="container_ak">
              <div className="box">
                <div className="icon">
                  <i className="fa fa-file-text" aria-hidden="true"></i>
                </div>
                <div className="content">
                  <h3>Report</h3>
                  <p>
                    Get your all report in one place.Healthcare reports are a
                    data-driven means of benchmarking the performance of
                    specific processes or functions within a healthcare
                  </p>
                </div>
              </div>
            </div>
            <div className="container_ak">
              <div className="box">
                <div className="icon">
                  <i className="fa fa-tint" aria-hidden="true"></i>
                </div>
                <div className="content">
                  <h3>Blood Donation</h3>
                  <p>
                    The blood donation process from the time you arrive until
                    the time you leave takes about an hour. The donation itself
                    is only about 8-10 minutes on average.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="sep" />
          <div className="container-banner"></div>

          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
            crossOrigin="anonymous"
          ></script>

<TestiMonials />

          <div id="cta">
            <div className="wrapper">
              <h3>Heard Enough?</h3>
              <p>
                Both doctor's appointment and doctor appointment are acceptable
                for describing a medical visit. In the first case the 's,
                instead of showing possession, is actually showing association;
                appointments of this nature are associated with doctors. In the
                latter case, the noun doctor is being used adjectivally to
                describe the type of appointment.{" "}
              </p>
              <a href="#" className="button-2">
                Get Started
              </a>
            </div>
          </div>

          <div className="containerfaq">
            <Faq
              data={data}
              styles={{
                titleTextColor: "#00337C",
                // rowTitleColor: "black",
                margin: "100vh",

                transitionDuration: "0.5s",
                timingFunc: "linear",
              }}
              config={{
                tabFocus: true,
              }}
            />
          </div>
        
      </div>
      
      <Footer />
    </>
  );
};

export default Home;
