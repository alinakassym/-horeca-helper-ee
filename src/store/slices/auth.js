import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    hhToken: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.hhToken = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setToken} = authSlice.actions;

export default authSlice.reducer;
