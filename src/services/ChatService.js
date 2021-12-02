import http from '../http-common';

export const getChats = async () => {
  const r = await http.get('/ee/chats');
  console.log('getChats: ', r.data);
  return r.data;
};

export const getChatById = async id => {
  const r = await http.get(`/ee/chats/${id}/messages`);
  console.log('getChatById: ', r.data);
  return r.data;
};

export const postMessage = async (id, data) => {
  const r = await http.post(`/ee/chats/${id}/messages`, data);
  return r.data;
};
