import axios from 'axios';
import {Platform} from 'react-native';

// emulator
const baseUrl =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

// android device
// const baseUrl = 'http://localhost:3000';

// cloud BE
// const baseUrl = 'https://horecahelper.kz/backend';

export const getEmployee = async hhToken => {
  const r = await axios.get(`${baseUrl}/ee/employees/me`, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('Employees Service getEmployee result:', r.data);
  return r;
};

export const updateEmployee = async (data, hhToken) => {
  const r = await axios.patch(`${baseUrl}/ee/employees/me`, data, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('Employees Service updateEmployee result:', r.data);
  return r;
};

export const postWork = async (data, hhToken) => {
  const r = await axios.post(`${baseUrl}/ee/works`, data, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('Employees Service setWork result:', r.data);
  return r;
};
