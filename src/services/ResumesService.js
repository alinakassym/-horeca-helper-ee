import http from '../http-common';

export const getMy = async () => {
  const r = await http.get('/ee/resumes/my');
  return r.data;
};

export const getOne = async id => {
  const r = await http.get(`/ee/resumes/${id}`);
  return r.data;
};

export const create = async data => {
  const r = await http.post('/ee/resumes', data);
  return r.data;
};

export const update = async (id, data) => {
  const r = await http.patch(`/ee/resumes/${id}`, data);
  return r.data;
};

export const remove = async id => {
  const r = await http.delete(`/ee/resumes/${id}`);
  return r.data;
};
