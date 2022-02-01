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
      isStarred: null,
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
      isStarred: null,
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
        //age
        ageMin: action.payload.ageMin ? Number(action.payload.ageMin) : null,
        ageMax: action.payload.ageMax ? Number(action.payload.ageMax) : null,

        // experience
        experienceMin: action.payload.experienceMin
          ? Number(action.payload.experienceMin)
          : null,
        experienceMax: action.payload.experienceMax
          ? Number(action.payload.experienceMax)
          : null,

        // salary
        salaryMin: action.payload.salaryMin
          ? Number(action.payload.salaryMin)
          : null,
        salaryMax: action.payload.salaryMax
          ? Number(action.payload.salaryMax)
          : null,

        position: action.payload.position,
        positionId: action.payload.position?.id,
        companyCategoryId: action.payload.companyCategory?.id,
        companyCategory: action.payload.companyCategory,
        cityId: action.payload.city?.id,
        city: action.payload.city,
        genderId: action.payload.gender?.id,
        gender: action.payload.gender,

        scheduleId: action.payload.schedule?.id,
        schedule: action.payload.schedule,

        isStarred: action.payload.isStarred,
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
