import { useNavigate } from "react-router-dom";
import Navbar from "../shared/navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { COMPANIES_END_POINT } from "@/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/store/companySlice";


function CompanyCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState();
  const registerCompany = async () => {
    try {
      const res = await axios.post(`${COMPANIES_END_POINT}/register`, {
        companyName
      }, { withCredentials: true })
      if(res.data.success){
        dispatch(setSingleCompany(res?.data?.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id
        
        navigate(`/admin/companies/${companyId}`);
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <div >
      <Navbar></Navbar>
      <h1 className="font-bold text-3xl text-center my-5" >Add a new Company</h1>
      <div className="max-w-4xl mx-auto" >
        <div className='my-10'>
          <h1 className='font-bold text-2xl'>Your Company Name</h1>
          <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2 rounded-[0.5rem]"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}

        />
        <div className='flex items-center gap-2 my-10'>
          <Button variant="outline" onClick={() => navigate("/admin/companies")} className="rounded-[0.5rem]">Cancel</Button>
          <Button onClick ={registerCompany}
            className="rounded-[0.5rem] bg-slate-900 text-white" variant="outline"  >Continue</Button>
        </div>
      </div>

    </div>
  )
}


export default CompanyCreate;