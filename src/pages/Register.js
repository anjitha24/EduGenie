import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const existingEmail = localStorage.getItem('email');
    const existingUsername = localStorage.getItem('username');

    if (email === existingEmail || username === existingUsername) {
      alert('Email or username already registered. Please use a different one.');
      return;
    }

    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <div className="auth-orange-page">
      <h1 className="page-heading">EduGenie</h1>
      <div className="auth-orange-container">
        <div className="auth-orange-card">
          <h2 className="auth-title">Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '' : ''}
              </span>
            </div>
            <button type="submit" className="auth-button">Register</button>
          </form>
          <div className="auth-footer">
            Already have an account?{' '}
            <span className="register-link" onClick={() => navigate('/login')}>
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
