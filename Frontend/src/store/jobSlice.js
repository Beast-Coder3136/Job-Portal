import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name : 'jobs',
  initialState : {
    allJobs : [],
    singleJob : null,
    allAdminJobs : [],
    searchJobByText : "",
    searchQueryText : ""
  },
  reducers : {
    setAllJobs : (store, action)=>{
      store.allJobs = action.payload;
    },
    setSingleJob : (store,action)=>{
      store.singleJob = action.payload;
    },
    setAllAdminJobs : (store,action)=>{
      store.allAdminJobs = action.payload;
      console.log(store);
      
    },
    setSearctJobByText : (store,action)=>{
      store.searchJobByText = action.payload;
    }
    ,
    setSearchQueryText : (store,action)=>{
      store.searchQueryText = action.payload
      console.log(store.searchQueryText);
    }
  }
})

export const {setAllJobs , setSingleJob ,setAllAdminJobs ,setSearctJobByText , setSearchQueryText}  = jobSlice.actions;
export default jobSlice.reducer;