import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

function LatestJobsCard({job}) {
  const navigate = useNavigate();
  return (
    <div onClick={()=> navigate(`job/description/${job._id}`)} className='p-5 rounded-[0.75rem] shadow-xl
     bg-surface border border-border  cursor-pointer'
     >
      <div>
        <h1 className='font-medium text-lg text-text-primary  mb-2'> {job?.company?.name} </h1>
        <p className='text-sm text-text-secondary'>{job?.location}</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'> {job?.title} </h1>
        <p className='text-sm text-text-secondary'> {job?.description}  </p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'bg-[#ef4444] text-[#f3f4f6] border border-[#3a3a4d]'} variant="ghost"> {job?.position}</Badge>
        <Badge className={'bg-[#06b6d4] text-white border border-[#3a3a4d]'} variant="ghost"> {job?.jobType} </Badge>
        <Badge className={'bg-[#22c55e] text-white border border-[#3a3a4d]'} variant="ghost"> {job?.salary} </Badge>
      </div>

    </div>

  )
}

export default LatestJobsCard;