import { COMPANIES_END_POINT } from "@/constant"
import { setSingleCompany } from "@/store/companySlice"
import axios from "axios"
import { use, useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetSingleCompany = (companyId)=>{
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchCompany = async()=>{
      try{
        const res = await axios.get(`${COMPANIES_END_POINT}/get/${companyId}`,{withCredentials : true})
        if(res.data.success){
          dispatch(setSingleCompany(res.data.company));
        }
      }
      catch(err){
        console.log(err);
      }
    }
    fetchCompany();
  },[companyId,dispatch])
  
}

export default useGetSingleCompany;