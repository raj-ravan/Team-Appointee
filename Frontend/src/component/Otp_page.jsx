import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Otp_page = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [demoOtpCode, setDemoOtpCode] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setMessage('Please enter a valid phone number.');
      return;
    }
    Axios.post('http://localhost:4000/send-otp', { phoneNo: phone })
      .then((res) => {
        setOtpSent(true);
        setMessage('OTP sent successfully!');
        if (res.data.demoOtp) {
          setDemoOtpCode(res.data.demoOtp);
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage('Failed to send OTP. Try again.');
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:4000/verify-otp', { phoneNo: phone, otp: otp })
      .then((res) => {
        if (res.data.status === 'success') {
          // Navigate to register page with phone in state
          navigate('/register', { state: { phone: phone } });
        } else {
          setMessage(res.data.message || 'OTP verification failed');
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage('Invalid or expired OTP.');
      });
  };

  return (
    <div className="login">
      <h1>Phone Verification</h1>
      {message && <p className="info-message" style={{ color: '#007bff', textAlign: 'center' }}>{message}</p>}
      
      {!otpSent ? (
        <form onSubmit={handleSendOtp}>
          <label>Enter Mobile Number</label>
          <input
            type="tel"
            placeholder="10 digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit" className="login_btn" style={{ width: '100%', marginTop: '15px' }}>
            Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <label>Enter OTP Code</label>
          {demoOtpCode && (
            <p style={{ fontSize: '12px', color: '#28a745', textAlign: 'center' }}>
              (Demo OTP Code: <strong>{demoOtpCode}</strong>)
            </p>
          )}
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit" className="login_btn" style={{ width: '100%', marginTop: '15px' }}>
            Verify & Proceed
          </button>
        </form>
      )}
    </div>
  );
};

export default Otp_page;
