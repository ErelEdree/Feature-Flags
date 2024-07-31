import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import FeatureManagement from "./pages/FeatureManagement"
import "./styles/app.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const user= JSON.parse(localStorage.getItem('user'));
    if(token){
      setIsAuthenticated(true);
      setUserName(user.userName);
    }
  },[])


  return (
    <Router>
      <div className="main">
        <Header isAuthenticated={isAuthenticated} userName = {userName} setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route path="/"element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
 />
          <Route path="/create" element={isAuthenticated ? <FeatureManagement /> : <Navigate to="/login" />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUserName={setUserName} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
