import axios from 'axios';
import {Platform} from 'react-native';

// emulator
const baseUrl =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

// android device
// const baseUrl = 'http://localhost:3000';

// cloud BE
// const baseUrl = 'https://horecahelper.kz/backend';

export const searchJobs = async (data, hhToken) => {
  const r = await axios.post(`${baseUrl}/ee/jobs/search`, data, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  // console.log('getJobs result: ', r.data)
  return r;
};

export const getJobById = async (id, hhToken) => {
  const r = await axios.get(`${baseUrl}/er/jobs/${id}`, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('getJobById result: ', r.data);
  return r;
};

export const updateJobById = async (id, data, hhToken) => {
  const r = await axios.patch(`${baseUrl}/er/jobs/${id}`, data, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('updateJobById result: ', r.data);
  return r;
};

export const postJob = async (data, hhToken) => {
  console.log('job item : ', data);
  const r = await axios.post(`${baseUrl}/er/jobs`, data, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('postJob result: ', r);
  return r;
};

export const deleteJobById = async (id, hhToken) => {
  const r = await axios.delete(`${baseUrl}/er/jobs/${id}`, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('deleteJobById result: ', r);
  return r;
};
