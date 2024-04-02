import React, { useState } from 'react';
import './resetpassword.css';
import { useNavigate } from 'react-router-dom';

  const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // TODO: Add your password reset logic here

    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    navigate('/Login');
  };

  return (
    <div className="reset-password">
      <h2>Reset Password</h2>
      {errorMessage && <div clcassName="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label> New Password </label>
        <input
          type="password"
          id="password"
          name="new-password"
          value={password}
          onChange={handlePasswordChange}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
