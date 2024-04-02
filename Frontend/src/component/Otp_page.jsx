import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Otp_page = ({pagerender}) => { 
  const [phone, setPhone] = useState('+91 ');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true); // Track whether the Resend OTP button should be disabled
  const [timer, setTimer] = useState(60); // Timer value in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setResendDisabled(false);
    }
  }, [timer]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [alertMessage]);
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
    }, auth);
  };
  console.log()
  const handleSend = (event) => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  };
    const handleResend = (forgot_otp) => {
    setHasFilled(false);
    setTimer(60);
    setResendDisabled(true);
    setAlertMessage('OTP Resent');
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        // SMS resent. Prompt user to type the code from the new message.
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // Error; SMS not resent
        console.log(error);
      });
  };
  const verifyOtp = (event) => {
    const otp = event.target.value;
    setOtp(otp);
    if (otp.length === 6) {
      // Verify OTP
      setIsLoading(true);
      const confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(user);
          setAlertMessage('User signed in successfully');
         
           navigate('/ResetPassword');
          
           navigate('/register', { state: { phone : phone.slice(3) } }); // Pass phone number as a parameter to Register component.
        
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          setAlertMessage("User couldn't sign in (bad verification code?)");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className='app__container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ width: '300px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography sx={{ padding: '20px' }} variant='h5' component='div'>{hasFilled ? 'Enter the OTP' : 'Enter your phone number'}</Typography>
          {hasFilled ? (
            <>
              <TextField
                sx={{ width: '240px', marginBottom: '20px' }}
                variant='outlined'
                label='OTP'
                value={otp}
                onChange={verifyOtp}
              />
              <Button variant='contained' sx={{ width: '240px', marginBottom: '10px' }} onClick={() => setHasFilled(false)}>Back</Button>
              <Button
                type='submit'
                variant='contained'
                sx={{ width: '240px' }}
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              {resendDisabled ? (
                <Button variant='outlined' sx={{ width: '240px', marginTop: '10px' }} disabled>{`Resend OTP (${timer}s)`}</Button>
              ) : (
                <Button variant='outlined' sx={{ width: '240px', marginTop: '10px' }} onClick={handleResend}>Resend OTP</Button>
              )}
            </>
          ) : (
            <form onSubmit={handleSend}>
              <TextField
                sx={{ width: '240px', marginBottom: '20px' }}
                variant='outlined'
                autoComplete='off'
                label='Phone Number'
                value={phone}
                onChange={(event) => {
                  if (event.target.value.length <= 14) {
                    setPhone(event.target.value);
                  }
                }}
              />
              <Button type='submit' variant='contained' sx={{ width: '240px' }}>Send Code</Button>
              
            </form>
          )}
        </CardContent>
      </Card>
      <div id='recaptcha'></div>
      {alertMessage && (
        <div className='alert'>
          <p>{alertMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Otp_page;
