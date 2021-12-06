import http from '../http-common';

export const searchJobs = async data => {
  const r = await http.post('/ee/jobs/search', data);
  // console.log('getJobs result: ', r.data)
  return r;
};

export const getJobById = async id => {
  const r = await http.get(`/ee/jobs/${id}`);
  // console.log('getJobById result: ', r.data);
  return r;
};

export const postJobApply = async (id, data) => {
  const r = await http.post(`/ee/jobs/${id}/apply`, data);
  // console.log('postJobApply result: ', r.data)
  return r;
};
