import {configureStore} from '@reduxjs/toolkit';
import jobsSlice from './slices/jobs';
import authSlice from './slices/auth';

export default configureStore({
  reducer: {
    jobs: jobsSlice,
    auth: authSlice,
  },
});
