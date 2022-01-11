import http from '../http-common';

export const getStats = async () => {
  const r = await http.get('/ee/utils/stats');
  console.log('getStats: ', r.data);
  return r.data;
};

export const getConfigs = async key => {
  const r = await http.get(`/ee/utils/configs/${key}`);
  console.log('getConfigs: ', r.data);
  return r.data;
};

export const getFAQs = async () => {
  const r = await http.get('/ee/utils/faqs');
  console.log('getFAQs: ', r.data);
  return r.data;
};
