import { useDispatch, useSelector } from "react-redux";
import JobCard from "./JobCard";
import Navbar from "./shared/navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useEffect } from "react";
import { setSearchQueryText } from "@/store/jobSlice";


function Browse() {
  useGetAllJobs();
  const {searchQueryText ,allJobs} = useSelector((store)=>store.jobs);
  const dispatch = useDispatch();
  useEffect(()=>{
    return()=>{
      dispatch(setSearchQueryText(""));
    }
  },[])

  return (
    <div className=" ">
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-lg">Search Result ({allJobs?.length})</h1>
        <div className="grid grid-cols-3 gap-4">

          {
            allJobs.map((job, index) => {
              return (
                <JobCard key={job?._id} job={job} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default Browse;