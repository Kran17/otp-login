import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/send-otp', { phoneNumber });
      setIsOtpSent(true);
    } catch (err) {
      console.error('Error sending OTP', err);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsVerifying(true);
      const response = await axios.post('http://localhost:5000/verify-otp', { phoneNumber, otp, password });
      alert(response.data.message);
      if (response.data.success) {
        navigate('/home');  // Redirect to homepage on successful login
      }
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div>
      <h2>{isOtpSent ? 'Verify OTP and Enter Password' : 'Create Account or Login'}</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      {isOtpSent && (
        <>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}
      <button onClick={isOtpSent ? handleVerifyOtp : handleSendOtp} disabled={isVerifying}>
        {isOtpSent ? 'Verify OTP and Login/Create Password' : 'Send OTP'}
      </button>
    </div>
  );
}

export default LoginPage;
