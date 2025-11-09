import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const applicationSlice = createSlice({
  name : 'applications',
  initialState : {
    allApplication : [],
    Applicants : [],
  },
  reducers : {
    setAllApplication : (store,action)=>{
      store.allApplication = action.payload;
    },
    setApplicants : (store, action)=>{
      store.Applicants = action.payload;
    } 
  }
})
export const {setAllApplication ,setApplicants} = applicationSlice.actions
export default applicationSlice.reducer;