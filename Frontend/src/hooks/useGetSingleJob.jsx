import { JOBS_END_POINT } from "@/constant";
import { setSingleJob } from "@/store/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetSingleJob = (jobId)=>{
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchJobByid = async()=>{
      try{
        const res = await axios.get(`${JOBS_END_POINT}/get/${jobId}`,{withCredentials : true});
        console.log(`${JOBS_END_POINT}/get/${jobId}`)
        if(res.data.success){
          console.log(res);
          dispatch(setSingleJob(res.data.job));
        }
      }catch(err){
        console.log(err);
        toast.error(err.response.data.message);
      }
      fetchJobByid();

    }
  },[])
}

export default useGetSingleJob;