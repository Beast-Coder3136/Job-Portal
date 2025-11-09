import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import Navbar from "../shared/navbar";
import { useState } from "react";
import axios from "axios";
import { USER_END_POINT } from "@/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading, setUser } from "@/store/authSlilce";


function Login() {
  const navigate = useNavigate();
  let [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });

  const { loading, user } = useSelector(store => store.auth);

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {

    e.preventDefault();
    dispatch(setLoading(true));
    const formData = new FormData();

    formData.append('email', input.email);
    formData.append('password', input.password);
    formData.append('role', input.role);

    try {
      const res = await axios.post(`${USER_END_POINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (res.data.success == true) {
        dispatch(setUser(res.data.user));
        console.log(user);
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err)
    }
    finally {
      dispatch(setLoading(false));
    }
  }
  // Hi i am shivani and i am a UI/UX designer and also a frontend engineer . Looking for a frontend developer job and check out my resume.
  // HTML, CSS , JAVASCRIPT, REACT, CANVA

  return (
    <>
      <div className="">
        <Navbar></Navbar>
        <div className="max-w-full flex items-center justify-center
        
        ">
          <form onSubmit={submitHandler} className="w-[40%] shadow-sm border border-border rounded-[0.5rem] p-4 my-10">
            <h1 className="font-bold text-xl mb-5">Login</h1>

            <div className="my-2">
              <Label>Email</Label>
              <Input type="email" name="email" value={input.email} onChange={changeEventHandler} />
            </div>
            <div className="my-2">
              <Label>Password</Label>
              <Input type="password" name="password" value={input.password} onChange={changeEventHandler} />
            </div>
            <div className="flex justify-between items-center">
              <RadioGroup default="comfortable" className="flex items-center gap-4 my-5">
                <div className="flex items-center space-x-2">
                  <Input type="radio" name="role" value="student" id="student" className="cursor-pointer"
                    checked={input.role == "student"} onChange={changeEventHandler} />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input type="radio" id="recruiter" name="role" value="recruiter" className="cursor-pointer"
                    checked={input.role == "recruiter"} onChange={changeEventHandler} />
                  <Label htmlFor="recruiter">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
            {
              loading ? <Button className="w-full my-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white"><Loader2 className="mr-2 h-4 w-4 animate-spin" /></Button>
                :
                <Button className='w-full my-4 rounded-[0.5rem]  bg-[#3b82f6] hover:bg-[#2563eb] text-white' type="submit" >Login</Button>
            }

            <span >Don't have an account?<Link to={"/signup"} className="text-[#a1a1b5]"> SingUp</Link></span>
          </form>
        </div>
      </div>

    </>
  )
}

export default Login;