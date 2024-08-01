import axios from 'axios';

const API_URL = 'http://localhost:4000/api/flags';

export const getFeatureFlags = async () => {
  return await axios.get(API_URL);
};

export const createFeatureFlag = async (data) => {
  console.log(`DATA IS: `);
  console.log(data);
  return await axios.post(API_URL, data); 
};

export const updateFeatureFlag = async (id, data) => {
  return await axios.put(`${API_URL}/${id}`, data);
};

export const deleteFeatureFlag = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
