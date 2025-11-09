import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function JobCard( {job} ) {
  const navigate = useNavigate();
  const diff =  (new Date() - new Date(job.createdAt));
  const dateDiff = Math.floor(diff/(1000*60*60*24));

  return (
    <><div className="p-5 rounded-[10px] bg-surface border border-border shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm  text-gray-500">{dateDiff}  days ago</p>
        <Button variant="outline" className="rounded-full" size="icon"> <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6 rounded-[5px]" variant="outline" size="icon" >
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg text-text-primary">{job?.company?.name}</h1>
          <p className="text-sm text-text-secondary">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 text-text-primary">{job?.title}</h1>
        <p className="text-sm text-text-secondary"> {job?.description} </p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'bg-[#ef4444] text-[#f3f4f6] border border-[#3a3a4d]'} variant="ghost"> {job?.position} Positions</Badge>
        <Badge className={'bg-[#06b6d4] text-white border border-[#3a3a4d]'} variant="ghost"> {job?.jobType} </Badge>
        <Badge className={'bg-[#22c55e] text-white border border-[#3a3a4d]'} variant="ghost"> {job?.salary}LPA</Badge>
      </div>
      <div className="mt-4 flex justify-between">
        <Button onClick={()=> navigate(`/job/description/${job._id}`) } variant="outline" className="rounded-full bg-[#3b82f6]  text-white"> Details </Button>
        <Button variant="outline" className="rounded-full bg-[#7209b7] text-white"> Save for Later </Button>
      </div>
    </div>
    </>
  )
}
export default JobCard;