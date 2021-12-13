import http from '../http-common';

export const getNotifications = async () => {
  const r = await http.get('/ee/notifications');
  console.log('getNotifications: ', r.data);
  return r.data;
};
