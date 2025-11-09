import { JOBS_END_POINT } from "@/constant";
import { setAllJobs } from "@/store/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetAllJobs = ()=>{
  const dispatch = useDispatch();
  const {searchQueryText} = useSelector(store=>store.jobs)
  useEffect(()=>{
    const fetchAllJobs = async()=>{
      try{
        const res = await axios.get(`${JOBS_END_POINT}/get?keyword=${searchQueryText}`,{withCredentials : true});
        if(res.data.success){
          dispatch(setAllJobs(res.data.jobs));
        }
      }
      catch(err){
        console.log(err);
        toast.error(err.response.data.message)
      }
    }
    fetchAllJobs();

  },[])
}

export default useGetAllJobs;