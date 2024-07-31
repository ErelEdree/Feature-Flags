import React from 'react';
import "../styles/DisplayFlag.css";

const DisplayFlag = ({ flag, onClose }) => {
  if (!flag) return null;
console.log(flag.name)
  return (
    <div className="display-overlay" onClick={onClose}>
      <div className="display-card" onClick={(e) => e.stopPropagation()}>
        <h2>{flag.name}</h2>
        <p><strong>Description:</strong> {flag.description}</p>
        <p><strong>Status:</strong> {flag.enabled ? 'Enabled' : 'Disabled'}</p>
        <p><strong>Environment:</strong> {flag.environment}</p>
        <p><strong>Permission:</strong> {flag.permission}</p>
        <p><strong>Country:</strong> {flag.country}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default DisplayFlag;
