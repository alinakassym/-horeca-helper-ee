import { createSlice } from '@reduxjs/toolkit';

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    filter: {
      test: 'Test 1',
      positionId: null,
      position: null,
      companyCategory: null,
      companyCategoryId: null,
      cityId: null,
      city: null,
      ageMin: null,
      ageMax: null,
      genderId: null,
      experienceMin: null,
      experienceMax: null,
      scheduleId: null,
      salaryMin: null,
      salaryMax: null,
      sortBy: 'updatedAt',
      sortOrder: 'DESC',
      pageSize: 10,
      pageNum: 1
    },
  },
  reducers: {
    setFilter: (state, action) => {
      const data = {
        test: action.payload.test,
        position: action.payload.position,
        positionId: action.payload.position ? action.payload.position.id : null,
        companyCategoryId: action.payload.companyCategory ? action.payload.companyCategory.id : null,
        companyCategory: action.payload.companyCategory,
        cityId: action.payload.city ? action.payload.city.id : null,
        city: action.payload.city,
        ageMin: action.payload.ageMin,
        ageMax: action.payload.ageMax,
        genderId: null,
        experienceMin: null,
        experienceMax: null,
        scheduleId: null,
        salaryMin: null,
        salaryMax: null,
        sortBy: 'updatedAt',
        sortOrder: 'DESC',
        pageSize: 10,
        pageNum: 1
      }
      state.filter = data
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFilter } = jobsSlice.actions

export default jobsSlice.reducer
