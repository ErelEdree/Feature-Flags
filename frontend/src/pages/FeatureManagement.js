import React, { useState } from 'react';
import { createFeatureFlag } from '../services/featureFlagServices';
import "../styles/FeatureManagement.css";
import { useNavigate } from 'react-router-dom';

const FeatureManagement = () => {
  const navigate = useNavigate();
  const [newFlag, setNewFlag] = useState({
    name: '',
    description: '',
    development: false,
    production: false,
    country: 'Ghana',
    permission: 'Developer'
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(newFlag);
    await createFeatureFlag(newFlag);
    setNewFlag({
      name: '',
      description: '',
      development: false,
      production: false,
      country: 'Ghana',
      permission: 'Developer'
    });

    navigate("/");
  };

  return (
    <div className="feature-management-container">
      <div className="create-card">
        <h2>Create New Feature Flag</h2>
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Name" 
              value={newFlag.name} 
              onChange={(e) => setNewFlag({ ...newFlag, name: e.target.value })} 
              required 
            />
          </div>
          <div className="form-group">
            <textarea 
              placeholder="Description" 
              value={newFlag.description} 
              onChange={(e) => setNewFlag({ ...newFlag, description: e.target.value })} 
            />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input 
                type="checkbox" 
                checked={newFlag.development} 
                onChange={(e) => setNewFlag({ ...newFlag, development: e.target.checked })} 
              />
              <span className="status-text">Development Enabled</span>
            </label>
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input 
                type="checkbox" 
                checked={newFlag.production} 
                onChange={(e) => setNewFlag({ ...newFlag, production: e.target.checked })} 
              />
              <span className="status-text">Production Enabled</span>
            </label>
          </div>
          <div className="form-group">
            <select 
              value={newFlag.country}
              onChange={(e) => setNewFlag({ ...newFlag, country: e.target.value })}
            >
              <option value="" disabled>Select Country</option>
              <option value="Ghana">Ghana</option>
              <option value="Uganda">Uganda</option>
            </select>
          </div>
          <div className="form-group">
            <select
              value={newFlag.permission}
              onChange={(e) => setNewFlag({ ...newFlag, permission: e.target.value })}
            >
              <option value="" disabled>Select Permission</option>
              <option value="Developer">Developer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button className="create-button" type="submit">Create Feature Flag</button>
        </form>
      </div>
    </div>
  );
};

export default FeatureManagement;