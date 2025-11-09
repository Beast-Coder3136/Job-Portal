import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name : "company",
  initialState : {
    allCompany : [],
    singleCompany : null,
    searchCompanyByText : ""
  },
  reducers : {
    setAllCompany : (store,action)=>{
      store.allCompany = action.payload;
    },
    setSingleCompany : (store,action)=>{
      store.singleCompany = action.payload;
    },
    setSearchCompanyByText : (store,action)=>{
      store.searchCompanyByText = action.payload;
    }
  }

})
export const {setAllCompany, setSingleCompany , setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;