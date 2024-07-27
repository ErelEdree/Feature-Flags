import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/header.css";

const Header = ({ setIsAuthenticated, isAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {isAuthenticated ? (
          <>
            <li className="navbar-item left"><NavLink to="/">Dashboard</NavLink></li>
            <div className="navbar-right">
              <li className="navbar-item"><NavLink to="/" onClick={handleLogout}>Logout</NavLink></li>
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
