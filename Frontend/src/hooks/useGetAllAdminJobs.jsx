import { JOBS_END_POINT } from "@/constant";
import { setAllAdminJobs } from "@/store/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = ()=>{
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchAdminJobs = async()=>{
      try{
        const res = await axios.get(`${JOBS_END_POINT}/adminJob`,{withCredentials : true});
        console.log(res);
        if(res.data.success){
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      }
      catch(err){
        console.log(err);
      }
    }
    fetchAdminJobs()
  },[])
}
export default useGetAllAdminJobs;