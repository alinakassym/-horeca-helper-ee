import axios from 'axios';

// emulator
const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost';

// android device
// const baseUrl = 'http://localhost';

const port = '3000';

export const getCompanies = async (hhToken) => {
  const r = await axios.get('' +
    `${baseUrl}:${port}/er/companies`, {
    headers: {'Authorization': `Bearer ${hhToken || ''}`}
  });
  console.log('res', r.data)
  return r;
};

export const getCompany = async (hhToken) => {
  const r = await axios.get('' +
    `${baseUrl}:${port}/er/companies/me`, {
    headers: {'Authorization': `Bearer ${hhToken || ''}`}
  });
  console.log('Company Service getCompany result:', r.data)
  return r;
};

export const updateCompany = async (data, hhToken) => {
  const r = await axios.patch('' +
    `${baseUrl}:${port}/er/companies/me`, data, {
    headers: {'Authorization': `Bearer ${hhToken || ''}`}
  });
  console.log('Company Service updateCompany result:', r.data)
  return r;
};
