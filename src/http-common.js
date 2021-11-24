import axios from 'axios';
import store from './store/index';

// import {Platform} from 'react-native';

// emulator
// const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

// android device
// const baseUrl = 'http://localhost:3000';

// cloud BE
const baseUrl = 'https://horecahelper.kz/backend';

const axiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  headers: {Authorization: ''},
});

axiosInstance.interceptors.request.use(
  config => {
    const hhToken = store.getState().auth.hhToken;
    console.log('axiosInstance hhToken', hhToken);
    if (hhToken) {
      config.headers.Authorization = `Bearer ${hhToken || ''}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
