import { useState } from "react";
import Navbar from "../shared/navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { JOBS_END_POINT } from "@/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const { allCompany } = useSelector(store => store.company);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    position: 0,
    companyId: ""
  })

  const changeEventHanlder = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const selectEventHandler = (value) => {
    console.log(value);
    setInput({ ...input, companyId: value })
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${JOBS_END_POINT}/post`, input, {
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center mx-auto my-10 justify-center w-screen " >
        <form onSubmit={submitHandler}
          action="" className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-[0.5rem]" >
          <div className="grid grid-cols-2 gap-4"
          >

            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input?.title}
                onChange={changeEventHanlder}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input?.description}
                onChange={changeEventHanlder}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input?.requirements}
                onChange={changeEventHanlder}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input?.salary}
                onChange={changeEventHanlder}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input?.location}
                onChange={changeEventHanlder}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experienceLevel"
                value={input?.experienceLevel}
                onChange={changeEventHanlder}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input?.jobType}
                onChange={changeEventHanlder}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input?.position}
                onChange={changeEventHanlder}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {
              allCompany.length > 0 &&
              <Select onValueChange={selectEventHandler}
                className="w-full">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" className="text-start" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup className="cursor-pointer">
                    {
                      allCompany.map((company) => {
                        return (
                          <SelectItem className="cursor-pointer"
                            name="companyId"
                            key={company._id} value={company._id} >{company.name}</SelectItem>
                        )
                      })
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>

            }

          </div>

          {
            allCompany.length == 0 ? <p className="text-red-600 font-bold text-xs text-center mt-2" >Please Registered a company first, before posting a job</p>
              :
              <Button variant="outline"
                className="bg-slate-900 text-white mt-4  w-full rounded-[0.5rem]" >Submit</Button>
          }
        </form>
      </div>
    </div>
  )
}

export default PostJob;