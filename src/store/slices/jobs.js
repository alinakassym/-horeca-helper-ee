import {createSlice} from '@reduxjs/toolkit';

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    isFilterApplied: false,
    sortBy: [
      {
        title: 'Date',
        title_ru: 'Дате',
        key: 'updatedAt',
      },
      {
        title: 'Relevance',
        title_ru: 'Актуальности',
        key: 'relevance',
      },
    ],
    filterReset: {
      positionId: null,
      position: null,
      companyCategory: null,
      companyCategoryId: null,
      cityId: null,
      city: null,
      ageMin: null,
      ageMax: null,
      genderId: null,
      gender: null,
      experienceMin: null,
      experienceMax: null,
      scheduleId: null,
      schedule: null,
      salaryMin: null,
      salaryMax: null,
      sortBy: 'updatedAt',
      sortOrder: 'DESC',
      orderBy: {
        title: 'Date',
        title_ru: 'Дате',
        key: 'updatedAt',
      },
      pageSize: 20,
      pageNum: 1,
    },
    filter: {
      positionId: null,
      position: null,
      companyCategory: null,
      companyCategoryId: null,
      cityId: null,
      city: null,
      ageMin: null,
      ageMax: null,
      genderId: null,
      gender: null,
      experienceMin: null,
      experienceMax: null,
      scheduleId: null,
      schedule: null,
      salaryMin: null,
      salaryMax: null,
      sortBy: 'updatedAt',
      orderBy: {
        title: 'Date',
        title_ru: 'Дате',
        key: 'updatedAt',
      },
      sortOrder: 'DESC',
      pageSize: 20,
      pageNum: 1,
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = {
        position: action.payload.position,
        positionId: action.payload.position?.id,
        companyCategoryId: action.payload.companyCategory?.id,
        companyCategory: action.payload.companyCategory,
        cityId: action.payload.city?.id,
        city: action.payload.city,
        ageMin: action.payload.ageMin,
        ageMax: action.payload.ageMax,
        genderId: action.payload.gender?.id,
        gender: action.payload.gender,
        experienceMin: action.payload.experienceMin,
        experienceMax: action.payload.experienceMax,
        scheduleId: action.payload.schedule?.id,
        schedule: action.payload.schedule,
        salaryMin:
          action.payload.salaryMin && action.payload.salaryMin.length > 0
            ? Number(action.payload.salaryMin)
            : null,
        salaryMax:
          action.payload.salaryMax && action.payload.salaryMax.length > 0
            ? Number(action.payload.salaryMax)
            : null,
        sortBy: action.payload.orderBy
          ? action.payload.orderBy.key
          : 'updatedAt',
        orderBy: action.payload.orderBy,
        sortOrder: 'DESC',
        pageSize: 20,
        pageNum: 1,
      };
    },
    setFilterApplied: (state, action) => {
      state.isFilterApplied = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setFilter, setFilterApplied} = jobsSlice.actions;

export default jobsSlice.reducer;
