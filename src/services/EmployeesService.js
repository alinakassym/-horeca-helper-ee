import axios from 'axios';
import {Platform} from 'react-native';

// emulator
const baseUrl =
  Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost';

// android device
// const baseUrl = 'http://localhost';

const port = '3000';

export const getEmployee = async hhToken => {
  const r = await axios.get(`${baseUrl}:${port}/ee/employees/me`, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('Employees Service getEmployee result:', r.data);
  return r;
};

export const updateEmployee = async (data, hhToken) => {
  const r = await axios.patch(`${baseUrl}:${port}/ee/employees/me`, data, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('Employees Service updateEmployee result:', r.data);
  return r;
};
