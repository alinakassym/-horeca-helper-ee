import axios from 'axios';
import {Platform} from 'react-native';

// emulator
const baseUrl =
  Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost';

// android device
// const baseUrl = 'http://localhost';

const port = '3000';

export const getHhToken = async googleToken => {
  const r = await axios.post(`${baseUrl}:${port}/ee/auth/login/google`, {
    googleToken: googleToken,
  });
  console.log('res', r.data);
  return r.data;
};
