import React, { useEffect, useState } from 'react';
import { getFeatureFlags, createFeatureFlag, updateFeatureFlag, deleteFeatureFlag } from '../services/featureFlagServices';
import "../styles/FeatureManagement.css";
import { useNavigate } from 'react-router-dom';

const FeatureManagement = ()=>{
    const navigate = useNavigate();
    const [newFlag, setNewFlag] = useState({ name: '', enabled: false, description: '', country:"Ghana", permission:"Developer",environment:"Development"});
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        console.log(newFlag);
        await createFeatureFlag(newFlag);
        setNewFlag({ name: '', enabled: false, description: '' });
        setIsCreating(false);
        navigate("/");
      };



 return(
    <div className="create-card">
      <h3>Create New Feature Flag</h3>
      <form onSubmit={handleCreate}>
        <input 
          type="text" 
          placeholder="Name" 
          value={newFlag.name} 
          onChange={(e) => setNewFlag({ ...newFlag, name: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={newFlag.description} 
          onChange={(e) => setNewFlag({ ...newFlag, description: e.target.value })} 
        />
        <label>
          <input 
            type="checkbox" 
            checked={newFlag.enabled} 
            onChange={(e) => setNewFlag({ ...newFlag, enabled: e.target.checked })} 
          />
          <span className="status-text">Enabled </span>
        </label>
        <div className="country select-container">
        <label htmlFor="select-country">
        Country:
        </label>
        <select id="select-country"
        value={newFlag.country}
        onChange={(e)=>{setNewFlag({...newFlag, country:e.target.value});}}
        >
            <option value="Ghana">Ghana</option>
            <option value="Uganda">Uganda</option>
        </select>
        </div>
      
      <div className="permission select-container">
        <label>Permissions:</label>
        <select
           value={newFlag.permission}
           onChange={(e)=>setNewFlag({...newFlag, permission:e.target.value})}>
            <option value="Developer">Developer</option>
            <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="environment select-container">
        <label>Develpment Environment:</label>
        <select
           value={newFlag.environment}
           onChange={(e)=>{setNewFlag({...newFlag, environment:e.target.value});}}>
            <option value="Development">Development</option>
            <option value="Production">Production</option>
        </select>
      </div>
        <button className="create-button" type="submit">Create</button>
     
      </form>
    </div>
 )
}

export default FeatureManagement;