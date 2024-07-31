import React, { useEffect, useState } from 'react';
import { getFeatureFlags, createFeatureFlag, updateFeatureFlag, deleteFeatureFlag } from '../services/featureFlagServices';
import "../styles/FeatureManagement.css";
import { useNavigate } from 'react-router-dom';



const FlagForm = ({loadFeatureFlags, setEditedFlag, editedFlag})=>{

    const navigate = useNavigate();
    const handleEdit = async (e) => {
        e.preventDefault();
        console.log(editedFlag)
        await updateFeatureFlag(editedFlag._id, editedFlag);
        setEditedFlag(null);
        loadFeatureFlags();
        console.log("sucess")
        navigate("/");
      };
      useEffect(()=>{
        if(editedFlag){
            setEditedFlag(editedFlag);
        }
      },[editedFlag])
return(
    <div className="edit-card" onClick={(e)=>{e.stopPropagation();}}>
      <h3>Edit Flag</h3>
      <form onSubmit={handleEdit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={editedFlag.name} 
          onChange={(e) => setEditedFlag({ ...editedFlag, name: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={editedFlag.description} 
          onChange={(e) => setEditedFlag({ ...editedFlag, description: e.target.value })} 
        />
        <label>
          <input 
            type="checkbox" 
            checked={editedFlag.enabled} 
            onChange={(e) => setEditedFlag({ ...editedFlag, enabled: e.target.checked })} 
          />
          <span className="status-text">
          Enabled
          </span>
        </label>

        <div className="country select-container">
        <label htmlFor="select-country">
        Country:
        </label>
        <select id="select-country"
        value={editedFlag.country}
        onChange={(e)=>{setEditedFlag({...editedFlag, country:e.target.value});}}
        >
            <option value="Ghana">Ghana</option>
            <option value="Uganda">Uganda</option>
        </select>
        </div>
        <div className="permission select-container">
        <label>Permissions:</label>
        <select
           value={editedFlag.permission}
           onChange={(e)=>setEditedFlag({...editedFlag, permission:e.target.value})}>
            <option value="Developer">Developer</option>
            <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="environment select-container">
        <label>Develpment Environment:</label>
        <select
           value={editedFlag.environment}
           onChange={(e)=>{setEditedFlag({...editedFlag, environment:e.target.value});}}>
            <option value="Development">Development</option>
            <option value="Production">Production</option>
        </select>
      </div>
        <button type="submit">Edit</button>
        {editedFlag&&(<button type="button" onClick={() => {
            setEditedFlag(null);}
            }>Cancel</button>)}
      </form>
    </div>
)
}

export default FlagForm;