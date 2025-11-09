import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { USER_END_POINT } from "@/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/authSlilce";
import { Loader2 } from "lucide-react";


function SignUp() {
  let [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const fileEventHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append('fullname', input.fullname);
      formData.append('email', input.email);
      formData.append('phoneNumber', input.phoneNumber);
      formData.append('password', input.password);
      formData.append('role', input.role);
      console.log(input);
      if (input.file) {
        formData.append('file', input.file);
      }
      const res = await axios.post(`${USER_END_POINT}/register`, formData, {
        withCredentials: true
      })
      console.log(USER_END_POINT + "/register");
      if (res.data.success) {
        navigate("/login");
        toast.success("Account Created Successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
    finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <>
      <div className="h-full">
        <Navbar></Navbar>
        <div className="max-w-full flex items-center justify-center">
          <form onSubmit={submitHandler} encType="multipart/form-data"
            className="w-[40%] shadow-sm border border-border   rounded-[0.5rem] p-4 my-10">
            <h1 className="font-bold text-xl mb-5">Signup</h1>
            <div className="my-2">
              <Label>Full Name</Label>
              <Input type="text" name="fullname" value={input.fullname}
                onChange={changeEventHandler} />
            </div>
            <div className="my-2">
              <Label>Email</Label>
              <Input type="email" name="email" value={input.email} onChange={changeEventHandler} />
            </div>
            <div className="my-2">
              <Label>Phone Number</Label>
              <Input type="number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} />
            </div>
            <div className="my-2">
              <Label>Password</Label>
              <Input type="password" name="password" value={input.password} onChange={changeEventHandler} />
            </div>
            <div className="flex justify-between items-center">
              <RadioGroup default="comfortable" className="flex items-center gap-4 my-5">
                <div className="flex items-center space-x-2">
                  <Input type="radio" name="role" value="student" className="cursor-pointer"
                    checked={input.role == "student"} onChange={changeEventHandler} />
                  <Label htmlFor="option-one">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input type="radio" name="role" value="recruiter" className="cursor-pointer"
                    checked={input.role == "recruiter"} onChange={changeEventHandler} />
                  <Label htmlFor="option-one">Recruiter</Label>
                </div>

              </RadioGroup>
              <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input type="file" name="file" accept="image/*" className="cursor-pointer"
                  onChange={fileEventHandler} />
              </div>
            </div>
            {
              loading ? <Button className="w-full my-4 rounded-[0.5rem]  bg-[#3b82f6] hover:bg-[#2563eb] text-white"><Loader2 className="mr-2 h-4 w-4 animate-spin" /></Button>
                :
                <Button className='w-full my-4 rounded-[0.5rem]  bg-[#3b82f6] hover:bg-[#2563eb] text-white' type="submit" >Signup</Button>
            }
            <span >Already have an account?<Link to={"/login"} className="text-[#a1a1b5]"> login</Link></span>
          </form>
        </div>
      </div>


    </>
  )
}

export default SignUp;