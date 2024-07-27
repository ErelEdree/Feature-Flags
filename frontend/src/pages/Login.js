import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/auth.css";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });

  const { userName, password } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', formData);
      console.log(res.data);
      setIsAuthenticated(true);
      navigate('/');
      alert('Login successful!');
    } catch (err) {
      console.error(err.response.data);
      alert('Login failed!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Username:</label>
            <input type="text" id="userName" name="userName" value={userName} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={onChange} required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
