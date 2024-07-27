import React, { useEffect, useState } from 'react';
import { getFeatureFlags, createFeatureFlag, updateFeatureFlag, deleteFeatureFlag } from '../services/featureFlagServices';
import ConfirmModal from '../components/ConfirmModal';
import "../styles/featureFlags.css";

const Dashboard = () => {
  const [featureFlags, setFeatureFlags] = useState([]);
  const [newFlag, setNewFlag] = useState({ name: '', enabled: false, description: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [flagToDelete, setFlagToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedFlag, setExpandedFlag] = useState(null);

  useEffect(() => {
    loadFeatureFlags();
  }, []);

  const loadFeatureFlags = async () => {
    setIsLoading(true);
    const response = await getFeatureFlags();
    setFeatureFlags(response.data);
    setIsLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await createFeatureFlag(newFlag);
    setNewFlag({ name: '', enabled: false, description: '' });
    setIsCreating(false);
    loadFeatureFlags();
  };

  const handleUpdate = async (id, updatedFlag) => {
    setIsLoading(true);
    await updateFeatureFlag(id, updatedFlag);
    loadFeatureFlags();
  };

  const handleDeleteClick = (flag) => {
    setFlagToDelete(flag);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (flagToDelete) {
      setIsLoading(true);
      await deleteFeatureFlag(flagToDelete._id);
      loadFeatureFlags();
    }
    setIsConfirmModalOpen(false);
    setFlagToDelete(null);
  };

  const toggleExpand = (id) => {
    setExpandedFlag(expandedFlag === id ? null : id);
  };

  return (
    <div className="feature-flags">
      <h2>Feature Flags</h2>
      
      {isLoading && <p>Loading...</p>}
      
      <button onClick={() => setIsCreating(true)} className="create-button">
        + Create New Flag
      </button>
  
      {isCreating && (
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
              Enabled
            </label>
            <button type="submit">Create</button>
            <button type="button" onClick={() => setIsCreating(false)}>Cancel</button>
          </form>
        </div>
      )}
  
      <div className="flag-list">
        {featureFlags.map((flag) => (
          <div key={flag._id} className="flag-item">
            <h3>{flag.name}</h3>
            <p className={expandedFlag === flag._id ? "description expanded" : "description"}>
              {flag.description}
            </p>
            <button 
              className="expand-button"
              onClick={() => toggleExpand(flag._id)}
            >
              {expandedFlag === flag._id ? "Collapse" : "Expand"}
            </button>
            <p>
              Status: 
              <span className={`status ${flag.enabled ? 'enabled' : 'disabled'}`}>
                {flag.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </p>
            <button 
              className="toggle-button"
              onClick={() => handleUpdate(flag._id, { ...flag, enabled: !flag.enabled })}
            >
              Toggle
            </button>
            <button 
              className="delete-button"
              onClick={() => handleDeleteClick(flag)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the flag "${flagToDelete?.name}"?`}
      />
    </div>
  );
};

export default Dashboard;
