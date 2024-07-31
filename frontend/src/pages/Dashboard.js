import React, { useEffect, useState } from 'react';
import { getFeatureFlags, updateFeatureFlag, deleteFeatureFlag } from '../services/featureFlagServices';
import "../styles/Dashboard.css";
import FlagForm from "../components/FlagForm";
import "../styles/editForm.css";
import ConfirmModal from '../components/ConfirmModal';
import DisplayFlag from "../components/DisplayFlag";

const Dashboard = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [flagToDelete, setFlagToDelete] = useState(null);
  const [featureFlags, setFeatureFlags] = useState([]);
  const [editedFlag, setEditedFlag] = useState(null);
  const [displayFlag, setDisplayFlag] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedEnvironment, setSelectedEnvironment] = useState('');

  useEffect(() => {
    loadFeatureFlags();
  }, []);

  const loadFeatureFlags = async () => {
    const response = await getFeatureFlags();
    setFeatureFlags(response.data);
  };

  const handleUpdate = async (id, updatedFlag) => {
    await updateFeatureFlag(id, updatedFlag);
    loadFeatureFlags();
  };

  const handleDeleteClick = (flag) => {
    setFlagToDelete(flag);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (flagToDelete) {
      await deleteFeatureFlag(flagToDelete._id);
      loadFeatureFlags();
    }
    setIsConfirmModalOpen(false);
    setFlagToDelete(null);
  };



  const toDisplayFlag = (flag) => {
    setDisplayFlag(flag);
  };


  const closeDisplayFlag = () => {
    setDisplayFlag(null);
  };

  const filteredFeatureFlags = featureFlags.filter(flag => {
    return (
      (selectedCountry === '' || flag.country === selectedCountry) &&
      (selectedEnvironment === '' || flag.environment === selectedEnvironment)
    );
  });



  return (
    <div className="feature-flags">
      <h2>Feature Flags</h2>
      {editedFlag && (
        <div className="edit-form" onClick={()=>{setEditedFlag(null)}}>
          <FlagForm loadFeatureFlags={loadFeatureFlags} setEditedFlag={setEditedFlag} editedFlag={editedFlag} />
        </div>
      )}
      <div className="filters">
        <label htmlFor="country-select">Country:</label>
        <select 
          id="country-select" 
          value={selectedCountry} 
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">All</option>
          <option value="Ghana">Ghana</option>
          <option value="Uganda">Uganda</option>
        </select>

        <label htmlFor="environment-select">Environment:</label>
        <select 
          id="environment-select" 
          value={selectedEnvironment} 
          onChange={(e) => setSelectedEnvironment(e.target.value)}
        >
          <option value="">All</option>
          <option value="Production">Production</option>
          <option value="Development">Development</option>
        </select>
      </div>
      <div className="flag-list">
        {filteredFeatureFlags.map((flag) => (
          <div 
            key={flag._id} 
            className="flag-item" 
            onClick={() => toDisplayFlag(flag)}
          >
            <h3>{flag.name}</h3>
        
            <p>
              Status: 
              <span className={`status ${flag.enabled ? 'enabled' : 'disabled'}`}>
                {flag.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </p>

            <p>Environment: <span className={`flag-environment ${flag.environment}`}>{flag.environment}</span></p>
            <button 
              className="toggle-button"
              onClick={(e) => { e.stopPropagation(); handleUpdate(flag._id, { ...flag, enabled: !flag.enabled })}}
            >
              Toggle
            </button>
            <button 
              className="delete-button"
              onClick={(e) => { e.stopPropagation(); handleDeleteClick(flag) }}
            >
              Delete
            </button>
            <button
              className="edit-button"
              onClick={(e) => { e.stopPropagation(); setEditedFlag(flag) }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {displayFlag && <DisplayFlag flag={displayFlag} onClose={closeDisplayFlag} />}

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
