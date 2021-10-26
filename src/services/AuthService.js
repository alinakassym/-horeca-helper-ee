import axios from 'axios';
import {Platform} from 'react-native';

// emulator
// const baseUrl =
//   Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

// android device
// const baseUrl = 'http://localhost:3000';

// cloud BE
const baseUrl = 'https://horecahelper.kz/backend';

export const getHhToken = async googleToken => {
  const r = await axios.post(`${baseUrl}/ee/auth/login/google`, {
    googleToken: googleToken,
  });
  console.log('res', r.data);
  return r.data;
};
