import { configureStore } from '@reduxjs/toolkit';
import jobsSlice from './slices/jobs';

export default configureStore({
  reducer: {
    jobs: jobsSlice
  },
})
