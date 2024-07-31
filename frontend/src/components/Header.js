import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/header.css";

const Header = ({ userName, setIsAuthenticated, isAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {isAuthenticated ? (
          <>
          <div className="navbar-left">
            <li className="navbar-item left"><NavLink to="/">Dashboard</NavLink></li>
            <li className="navbar-item left"><NavLink to="/create">Create New Feature</NavLink></li>
            </div>
            <div className="navbar-right">
              <li className="navbar-item"><NavLink to="/" onClick={handleLogout}>Logout</NavLink></li>
              <li className="navbar-item">Current User: {userName}</li>
            </div>
          </>
        ) : (
          <>
          <div></div>
            <div className="navbar-right">
              <li className="navbar-item"><NavLink to="/register">Register</NavLink></li>
              <li className="navbar-item"><NavLink to="/login">Login</NavLink></li>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
