import { APPLICATION_END_POINT } from "@/constant";
import { setAllApplication } from "@/store/applicationSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetAllAppliedJobs = ()=>{
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchAppliedJobs = async()=>{
      try{
      const res = await axios.get(`${APPLICATION_END_POINT}/get`,{withCredentials : true});
      if(res.data.success){
        dispatch(setAllApplication(res.data.applications));
      }
      }
      catch(err){
        console.log(err);
      }
    }
    fetchAppliedJobs();
  },[])
}

export default useGetAllAppliedJobs;