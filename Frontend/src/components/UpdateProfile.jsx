import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_END_POINT } from "@/constant";
import { setLoading, setUser } from "@/store/authSlilce";
import { toast } from "sonner";

function UpdateProfile({ open, setOpen }) {
  
  const { user , loading} = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,

  })
    const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const fileEventHandler = (e) => {
  setInput({ ...input, file : e.target.files?.[0] });
  console.log(input);
  }
  const submitHandler = async(e)=>{
    e.preventDefault();
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("bio",input.bio);
    formData.append("skills",input.skills);
    if(input.file){
      formData.append("file",input.file);
    }


    try{
      const res = await axios.post(`${USER_END_POINT}/profile/update`,formData,{

        withCredentials : true
      })

      if(res.data.success){
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        dispatch(setLoading(false));
        setOpen(false)
      }
    }
    catch(err){
      console.log(err);
      toast.error(err.response.data.message);
      setOpen(false);
    }
    finally{
    }
  }

  return (
    <div>
      <Dialog open={open} >
        <DialogContent className="bg-white rounded-[10px] sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>
              Edit Profile
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler} encType="multipart/form-data" >
            <div className="grid gap-4 py-4 items-center " >
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="fullname" className="col-span-3 rounded-[10px]"
                  value={input.fullname}  onChange={changeEventHandler} />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" className="col-span-3 rounded-[10px]"
                value={input.email} onChange={changeEventHandler}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" name="phoneNumber" type="number" className="col-span-3 rounded-[10px]" value={input.phoneNumber} onChange={changeEventHandler}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" name="bio" className="col-span-3 rounded-[10px]" 
                value={input.bio} onChange={changeEventHandler}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="skills">Skills</Label>
                <Input id="skills" name="skills" className="col-span-3 rounded-[10px]" 
                value={input.skills} onChange={changeEventHandler} />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="resume">Resume</Label>
                <Input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" className="col-span-3 rounded-[10px]" onChange={fileEventHandler} />
              </div>

            </div>
            <DialogFooter>
              {
                loading ? <Button className="w-full my-4 bg-slate-900 text-white hover:bg-slate-800"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button>
                  :
                  <Button className='w-full my-4 bg-slate-900 text-white hover:bg-slate-800' type="submit" >Update</Button>
              }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )

}
export default UpdateProfile;