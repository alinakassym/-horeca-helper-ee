import {createSlice} from '@reduxjs/toolkit';

export const localeSlice = createSlice({
  name: 'locale',
  initialState: {
    lang: null,
    languages: [
      {
        id: 'ru',
        code: 'ru',
        title: 'Русский',
      },
      {
        id: 'en',
        code: 'en',
        title: 'English',
      },
    ],
    suffix: '',
  },
  reducers: {
    setLang: (state, action) => {
      const appLang = action.payload === 'en' ? 'en' : 'ru';
      console.log({appLang});
      state.lang = appLang;
      state.suffix = appLang === 'en' ? '' : `_${appLang}`;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setLang} = localeSlice.actions;

export default localeSlice.reducer;
