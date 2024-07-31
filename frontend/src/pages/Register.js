import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/register.css";  // Import the CSS file
import {Toaster,toast} from "sonner";
const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    role: 'Developer'
  });

  const { userName, password, role } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/register', formData);
      console.log(res.data);
      toast.success('Registration successful!');
      setTimeout(()=>{      navigate('/login');
      },1500);
    } catch (err) {
      console.error(err.response.data);
      toast.error('Registration failed!');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="userName" value={userName} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select name="role" value={role} onChange={onChange}>
              <option value="Developer">Developer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <Toaster richColors
      toastOptions={{
        style:{ 

          padding: '16px',
          borderRadius: '8px'}}}/> 
    </div>
  );
};

export default Register;
