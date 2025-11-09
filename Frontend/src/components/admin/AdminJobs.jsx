import { useNavigate } from "react-router-dom";
import Navbar from "../shared/navbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearctJobByText } from "@/store/jobSlice";

function AdminJobs() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useGetAllAdminJobs()
  useEffect(() => {
    dispatch(setSearctJobByText(input));
  }, [dispatch, input])
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between ">
          <Input type={"text"} name="company" className="w-fit rounded-[0.5rem]"
            placeholder="Filter job by title"
            onChange={(e) => setInput(e.target.value)} />
          <Button variant="outline" className="rounded-[0.5rem] bg-slate-900 text-white"
            onClick={() => navigate("/admin/jobs/create")}>
            Post New Job
          </Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  )
}
export default AdminJobs;