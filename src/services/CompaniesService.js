import http from '../http-common';

export const getCompanies = async () => {
  const r = await http.get('/ee/companies');
  console.log('res', r.data);
  return r.data;
};

export const getCompany = async () => {
  const r = await http.get('/er/companies/me');
  console.log('Company Service getCompany result:', r.data);
  return r;
};

export const getCompanyStatus = async id => {
  console.log({id});
  const r = await http.get(`/ee/companies/${id}/status`);
  console.log('Company Service getCompanyStatus result:', r.data);
  return r.data;
};

export const updateCompany = async data => {
  const r = await http.patch('/er/companies/me', data);
  console.log('Company Service updateCompany result:', r.data);
  return r;
};
