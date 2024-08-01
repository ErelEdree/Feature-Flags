import React, { useEffect, useState } from 'react';
import { updateFeatureFlag } from '../services/featureFlagServices';
import "../styles/editForm.css";
import { useNavigate } from 'react-router-dom';
import {Toaster, toast} from "sonner";

const FlagForm = ({ userRole, loadFeatureFlags, setEditedFlag, editedFlag }) => {
  const navigate = useNavigate();

  const handleEdit = async (e) => {
    e.preventDefault();
    await updateFeatureFlag(editedFlag._id, editedFlag);
    setEditedFlag(null);
    loadFeatureFlags();
    navigate("/");
  };

  useEffect(() => {
    if (editedFlag) {
      document.body.classList.add('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [editedFlag]);

  return (
    <div onClick={(e) => e.stopPropagation()} className="edit-form">
      <div className="edit-card">
        <h3>Edit Feature</h3>
        <Toaster richColors
      toastOptions={{
        style:{ 

          padding: '16px',
          borderRadius: '8px'}}}/> 
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
              checked={editedFlag.development}
              onChange={(e) => {
                if (editedFlag.permission === 'Admin' && userRole !== 'Admin') {
                  toast.error("You don't have permission to update this feature flag.");
                  return;}
                  setEditedFlag({ ...editedFlag, development: e.target.checked });}}
            />
            <span className="status-text">Development Enabled</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={editedFlag.production}
              onChange={(e) => {
                if (editedFlag.permission === 'Admin' && userRole !== 'Admin') {
                  toast.error("You don't have permission to update this feature flag.");
                  return;}
                  setEditedFlag({ ...editedFlag, development: e.target.checked });}}
            />
            <span className="status-text">Production Enabled</span>
          </label>
          <div className="select-container">
            <label htmlFor="select-country">Country:</label>
            <select
              id="select-country"
              value={editedFlag.country}
              onChange={(e) => setEditedFlag({ ...editedFlag, country: e.target.value })}
            >
              <option value="Ghana">Ghana</option>
              <option value="Uganda">Uganda</option>
            </select>
          </div>
          <div className="select-container">
            <label>Permissions:</label>
            <select
              value={editedFlag.permission}
              onChange={(e) => {
              if (editedFlag.permission === 'Admin' && userRole !== 'Admin') {
                toast.error("You don't have permission to update this feature flag.");
                return;}
              setEditedFlag({ ...editedFlag, permission: e.target.value })
              }}
            >
              <option value="Developer">Developer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit">Edit</button>
          <button type="button" onClick={() => setEditedFlag(null)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default FlagForm;
