import axios from 'axios';
import {Platform} from 'react-native';

// emulator
const baseUrl =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

// android device
// const baseUrl = 'http://localhost:3000';

// cloud BE
// const baseUrl = 'https://horecahelper.kz/backend';

export const getCities = async hhToken => {
  const r = await axios.get(`${baseUrl}/ee/dictionaries/cities`, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('getCities result:', r.data);
  return r.data;
};

export const getGenders = async hhToken => {
  const r = await axios.get(`${baseUrl}/ee/dictionaries/genders`, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('getGenders result:', r.data);
  return r.data;
};

export const getPositions = async hhToken => {
  const r = await axios.get(`${baseUrl}/ee/dictionaries/positions`, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('getPositions result:', r.data);
  return r.data;
};

export const getSchedules = async hhToken => {
  const r = await axios.get(`${baseUrl}/ee/dictionaries/schedules`, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('getSchedules result:', r.data);
  return r.data;
};
