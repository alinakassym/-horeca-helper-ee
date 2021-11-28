import {Platform} from 'react-native';
import http from '../http-common';

export const getEmployee = async () => {
  const r = await http.get('/ee/employees/me');
  // console.log('Employees Service getEmployee/me result:', r.data);
  return r;
};

export const updateEmployee = async data => {
  const r = await http.patch('/ee/employees/me', data);
  // console.log('Employees Service updateEmployee result:', r.data);
  return r;
};

export const updateEmployeePhoto = async img => {
  const data = new FormData();
  data.append('file', {
    name: img.fileName,
    type: img.type,
    uri: Platform.OS === 'android' ? img.uri : img.uri.replace('file://', ''),
  });

  const url = '/ee/employees/me/photo';

  const r = await http.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
  console.log('Employees Service updateEmployeePhoto result:', r.data);
  return r;
};

export const postWork = async data => {
  const r = await http.post('/ee/works', data);
  // console.log('Employees Service postWork result:', r.data);
  return r;
};

export const updateWork = async data => {
  const r = await http.patch(`/ee/works/${data.id}`, data);
  console.log('Employees Service updateWork result:', r.data);
  return r;
};

export const sendCompanyReview = async (id, data) => {
  console.log('id', id);
  console.log('data', data);
  const r = await http.put(`/ee/works/${id}/review`, data);
  console.log('Employees Service sendCompanyReview result:', r.data);
  return r;
};

export const deleteWork = async id => {
  console.log('work id', id);
  const r = await http.delete(`/ee/works/${id}`);
  // console.log('Employees Service deleteWork result:', r.data);
  return r;
};
