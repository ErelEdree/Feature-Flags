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
        <div className="navbar-left">
          {isAuthenticated && (
            <>
              <li className="navbar-item">
                <NavLink to="/" activeClassName="active">Dashboard</NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/create" activeClassName="active">Create New Feature</NavLink>
              </li>
            </>
          )}
        </div>
        <div className="navbar-right">
          {isAuthenticated ? (
            <>
              <li className="navbar-item user-info">
                <div className="user-avatar">{userName[0].toUpperCase()}</div>
                <span>{userName}</span>
              </li>
              <li className="navbar-item">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <NavLink to="/register" activeClassName="active">Register</NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/login" activeClassName="active">Login</NavLink>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Header;