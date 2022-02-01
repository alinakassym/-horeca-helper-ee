import {configureStore} from '@reduxjs/toolkit';
import jobsSlice from './slices/jobs';
import authSlice from './slices/auth';
import localeSlice from './slices/locale';

export default configureStore({
  reducer: {
    jobs: jobsSlice,
    auth: authSlice,
    locale: localeSlice,
  },
});
