import axios from 'axios';
import {Platform} from 'react-native';

// emulator
// const baseUrl =
//   Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

// android device
// const baseUrl = 'http://localhost:3000';

// cloud BE
const baseUrl = 'https://horecahelper.kz/backend';

export const searchJobs = async (data, hhToken) => {
  const r = await axios.post(`${baseUrl}/ee/jobs/search`, data, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  // console.log('getJobs result: ', r.data)
  return r;
};

export const getJobById = async (id, hhToken) => {
  const r = await axios.get(`${baseUrl}/ee/jobs/${id}`, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('getJobById result: ', r.data);
  return r;
};
