import { useSelector } from "react-redux";
import Navbar from "./shared/navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import ApplicationTable from "./ApplicationTable";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJobs";



function Profile() {
  const { user } = useSelector(store => store.auth);
  const [open, setOpen] = useState(false);
  useGetAllAppliedJobs();
  return (
    <div className="">
      <Navbar></Navbar>
      <div className='max-w-4xl mx-auto  rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div>
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right rounded-[0.5rem] bg-slate-900 text-white" variant="outline" >
            <Pen className="text-white" /> </Button>
        </div>
        <div className="my-2">
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1>Skills </h1>
          <div className="flex gap-2 my-2 items-center">
            {
              user.profile.skills.length > 0 ? user.profile.skills.map((item, index) => <Badge key={index} variant={"outline"} className={"bg-slate-900 text-white"}>{item}</Badge>) : <span>NA</span>
            }
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label className="text-md font-bold"> Resume </Label>
            {user.profile.resume ? <a target="blank" href={user.profile.resume} 
              className="text-blue-500 w-full hover:underline hover:text-black cursor-pointer"> {user.profile.resumeOriginalName} </a> : <span>NA</span>}
          </div>
        </div>
        <div>
          <h1 className="text-md font-bold text-center my-2">Applied Jobs</h1>
          <ApplicationTable></ApplicationTable>
        </div>
        <UpdateProfile open={open} setOpen={setOpen}  />
      </div>

    </div>
  )
}

export default Profile;