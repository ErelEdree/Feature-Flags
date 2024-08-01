import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/auth.css";
import { Toaster, toast } from 'sonner';

const Login = ({ setUserName, isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const { userName, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', formData);
      localStorage.setItem("token", "true");
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Login successful");
      setTimeout(() => {
        setIsAuthenticated(true);
        navigate('/');
        setUserName(userName);
      }, 1500);
    } catch (err) {
      console.error(err.response.data);
      toast.error("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" id="userName" name="userName" value={userName} onChange={onChange} required placeholder="Username" />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" value={password} onChange={onChange} required placeholder="Password" />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="register-link">Don't have an account? <a href="/register">Register</a></p>
      </div>
      <Toaster 
        richColors
        toastOptions={{
          style: { 
            padding: '16px',
            borderRadius: '8px'
          }
        }}
      />
    </div>
  );
};

export default Login;