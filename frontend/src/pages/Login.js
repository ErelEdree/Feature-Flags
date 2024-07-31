import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/auth.css";
import {Toaster, toast} from 'sonner';

const Login = ({setUserName,isAuthenticated,setIsAuthenticated }) => {
  const navigate = useNavigate();
useEffect(()=>{
  console.log(isAuthenticated)
  if(isAuthenticated){
  navigate("/");
}},[])
 
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });

  const { userName, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', formData);
      console.log(res);
      localStorage.setItem("token",true);
      localStorage.setItem("user",res.data.userName);
      toast.success("login succesful");
      setTimeout(()=>{
        setIsAuthenticated(true);
        navigate('/');
        setUserName(userName);
      },1500);
    } catch (err) {
      console.error(err.response.data);
      toast.error("login failed")
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 class="login-title">Login</h2>
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
      <Toaster richColors
      toastOptions={{
        style:{ 

          padding: '16px',
          borderRadius: '8px'}}}/> 
    </div>
  );
};

export default Login;
