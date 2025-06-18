import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';

const Login = ({ setIsLoggedIn }) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    const isValidLogin =
      (loginId === storedUsername || loginId === storedEmail) &&
      password === storedPassword;

    if (isValidLogin) {
      setIsLoggedIn(true);
      localStorage.setItem('loggedIn', true);
      navigate('/');
    } else {
      alert('Invalid username/email or password');
    }
  };

  return (
    <div className="auth-orange-page">
      <h1 className="page-heading">EduGenie</h1>
      <div className="auth-orange-container">
        <div className="auth-orange-card">
          <h2 className="auth-title">Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username or Email"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
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
                aria-label="Toggle password visibility"
              >
                {showPassword ? '' : ''}
              </span>
            </div>
            <button type="submit" className="auth-button">Login</button>
          </form>
          <div className="auth-footer">
            Don’t have an account?{' '}
            <span className="register-link" onClick={() => navigate('/register')}>
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
