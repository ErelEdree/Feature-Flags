import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/register.css";  // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    role: 'developer'
  });

  const { userName, password, role } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/register', formData);
      console.log(res.data);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
      alert('Registration failed!');
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
              <option value="developer">Developer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
