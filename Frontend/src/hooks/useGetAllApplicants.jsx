import { APPLICATION_END_POINT } from "@/constant";
import { setApplicants } from "@/store/applicationSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";




const useGetAllApplicants = (jobId)=>{
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchApplicants = async()=>{
      try{
        const res = await axios.get(`${APPLICATION_END_POINT}/applicants/${jobId}`,{withCredentials : true});

        if(res.data.success){
          dispatch(setApplicants(res.data.applicants));

        }
      }
      catch(err){
        console.log(err);
      }
    }
    fetchApplicants();
  },[])
}

export default useGetAllApplicants;