import React, { useEffect, useState } from 'react';
import { getFeatureFlags, updateFeatureFlag, deleteFeatureFlag } from '../services/featureFlagServices';
import "../styles/Dashboard.css";
import FlagForm from "../components/FlagForm";
import "../styles/editForm.css";
import ConfirmModal from '../components/ConfirmModal';
import DisplayFlag from "../components/DisplayFlag";
import Switch from "react-switch";  // Import the Switch component
import {Toaster, toast} from "sonner";

const Dashboard = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [flagToDelete, setFlagToDelete] = useState(null);
  const [featureFlags, setFeatureFlags] = useState([]);
  const [editedFlag, setEditedFlag] = useState(null);
  const [displayFlag, setDisplayFlag] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedEnvironment, setSelectedEnvironment] = useState('');

  const userRole = JSON.parse(localStorage.getItem("user")).role;
  console.log(userRole);
  useEffect(() => {
    loadFeatureFlags();
  }, []);

  useEffect(()=>{
    toast.info("Click on Feature to expand");
    console.log("TEST");
  },[])
  const loadFeatureFlags = async () => {
    const response = await getFeatureFlags();
    setFeatureFlags(response.data);
  };

  const handleUpdate = async (id, updatedFlag) => {
    if (updatedFlag.permission === 'Admin' && userRole !== 'Admin') {
      toast.error("You don't have permission to update this feature flag.");
      return;
    }
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
      (selectedEnvironment === '' ||
        (selectedEnvironment === 'Development' && flag.development) ||
        (selectedEnvironment === 'Production' && flag.production))
    );
  });

  return (
    <div className="feature-flags">
      <h2>Feature Flags</h2>
      
      <p className="explanation">Feature flags enable you to change your app's behaviour from within this dashboard. For example,
        turn on/off a sales banner or a title of a landing page.
      </p>

      <Toaster richColors
      toastOptions={{
        style:{ 

          padding: '16px',
          borderRadius: '8px'}}}/> 
      {editedFlag && (
        <div className="edit-form" onClick={() => {setEditedFlag(null); }}>
          <FlagForm userRole = {userRole} loadFeatureFlags={loadFeatureFlags} setEditedFlag={setEditedFlag} editedFlag={editedFlag} />
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
              Development Status: 
        
            </p>
            <div onClick={(e)=>{e.stopPropagation()}} className="switch-container">
              <Switch
                onChange={() => handleUpdate(flag._id, { ...flag, development: !flag.development })}
                checked={flag.development}
                offColor="#e74c3c"
                onColor="#2ecc71"
                uncheckedIcon={false}
                checkedIcon={false}
              />
            </div>

            <p>
              Production Status: 
            
            </p>
            <div className="switch-container" onClick={(e)=>{e.stopPropagation()}}>
              <Switch
                onChange={() => handleUpdate(flag._id, { ...flag, production: !flag.production })}
                checked={flag.production}
                offColor="#e74c3c"
                onColor="#2ecc71"
                uncheckedIcon={false}
                checkedIcon={false}
              />
            </div>

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
