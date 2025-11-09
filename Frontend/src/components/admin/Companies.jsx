import { useNavigate } from "react-router-dom";
import CompaniesTable from "./CompaniesTable";
import Navbar from "../shared/navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setSearchCompanyByText } from "@/store/companySlice";

function Companies() {
  const navigate = useNavigate();
  const [input,setInput] = useState("");
  const dispatch = useDispatch();
  useGetAllCompanies();
  useEffect(()=>{
    dispatch(setSearchCompanyByText(input));
  },[dispatch,input])
  return (
    <div className=" h-full">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between ">
          <Input type={"text"} name="company" className="w-fit rounded-[0.5rem]"
            placeholder="Filter Company by name" 
            onChange={(e)=>setInput(e.target.value)} />
          <Button variant="outline" className="rounded-[0.5rem]
           bg-[#3b82f6]  text-white"
            onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  )
}
export default Companies;