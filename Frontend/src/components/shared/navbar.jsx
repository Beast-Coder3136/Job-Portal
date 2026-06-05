import React from "react";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_END_POINT } from "@/constant";
import { toast } from "sonner";
import { setUser } from "@/store/authSlilce";


function Navbar() {
  const {user} = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutHandler = async ()=>{
    try {
      const res = await axios.post(`${USER_END_POINT}/logout`, {}, { withCredentials: true })
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(null))
        navigate("/");
        window.location.reload();
      }
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }

  }

  return (

    <div className="flex justify-between px-4 items-center mx-auto max-w-full h-16
     bg-[#ffffff] border-b border-[#e2e8f0]">
      <div>
        <h1 className="text-2xl font-bold">Job<span className="text-[#8b5cf6]">Portal</span></h1>
      </div>
      <div className="flex gap-2">
        <ul className="flex font-medium items-center gap-5">
          {
            user && user?.role == 'student' && <>
              <Link to={"/"} >Home</Link>
              <Link to={"/job"}>Jobs</Link>
              <Link to={"/browse"}> Browse </Link>
            </>}
          {user && user?.role == 'recruiter' &&
            <>
              <Link to={"/admin/companies"}>Companies</Link>
              <Link to={"/admin/jobs"}> Jobs </Link>
            </>
          }
        </ul>
        {
          user == null ? (<div className="flex items-center gap-2">
            <Link to={"/login"}><Button
              className="rounded-[0.5rem] bg-muted text-text-primary border border-border px-4 py-2  hover:bg-highlight transition" variant="outline"> LogIn </Button></Link>
            <Link to={"/signup"}><Button  
              className=" rounded-[0.5rem] bg-primary text-white px-4 py-2  hover:bg-blue-600 transition"> SignUp </Button></Link>

          </div>) :
            (<Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white" >
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>

                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    {user && user.role == "student" &&
                      <p className="text-sm text-slate-400">{user?.profile?.bio}</p>
                    }
                  </div>

                </div>
                <div className="flex flex-col text-gray-600">
                  {user && user.role == "student" &&
                    <div className="flex w-fit items-center cursor-pointer ">
                      <User2 />
                      <Button variant="link" >
                        <Link to={"/profile"} >View Profile</Link>
                      </Button>
                    </div>
                  }
                  <div className="flex w-fit 
                   items-center cursor-pointer">
                    <LogOut />
                    <Button variant="link" onClick={logOutHandler}  >Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>)
        }
      </div>
    </div>

  )
}
export default Navbar;