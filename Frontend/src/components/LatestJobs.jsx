import { useSelector } from "react-redux";
import LatestJobsCard from "./LatestJobsCard";
import { useNavigate } from "react-router-dom";

function LatestJobs() {
  const {allJobs} = useSelector((store)=>store.jobs);
  const navigate = useNavigate();


  return (
    <>
      <div className="max-w-full mx-12">
        <h1 className="text-center text-4xl font-bold" ><span className="text-[#6A38C2]"> Latest & Top </span> Jobs Opening</h1>
        <div className="grid grid-cols-3 gap-4 my-8">
          {
            allJobs.length>0 ? allJobs?.slice(0,6).map((job)=>{
              return ( <LatestJobsCard key={job?._id} job={job} 
                ></LatestJobsCard> )
            }) :
            <span className="font-bold text-xl text-center">No Jobs Found</span>
          }
        </div>
      </div>
    </>
  )
}
export default LatestJobs