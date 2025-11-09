import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/navbar";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANIES_END_POINT } from "@/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "@/store/companySlice";
import useGetSingleCompany from "@/hooks/useGetSingelCompany";

function CompanySetup() {
  const navigate = useNavigate();
  const params = useParams();
  const [loading,setLoading] = useState(false);
  const companyId = params.id;
  useGetSingleCompany(companyId);
  const {singleCompany} = useSelector(store=>store.company);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  })
  console.log(companyId);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(`${COMPANIES_END_POINT}/update/${companyId}`, formData, {
        withCredentials: true
      })
      if(res.data.success){
        setLoading(false);
        toast.success(res.data.message);
        dispatch(setSingleCompany(res.data.company))
        navigate("/admin/companies");
      }
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }

  useEffect(()=>{
    setInput({
      name : singleCompany.name,
      description : singleCompany.description,
      location : singleCompany.location,
      website : singleCompany.website,
      file : singleCompany.file
    })
  },[singleCompany]);

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-xl mx-auto my-10">
        <form encType="multipart/form-data" onSubmit={submitHandler}>
          <div className="flex items-center justify-between p-8">
            <Button type="button" onClick={()=>navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold 
          rounded-[0.5rem]">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl ">Company Setup</h1>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4 bg-black text-white" variant="outline" > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" variant="outline" className="w-full my-4 bg-black text-white">Update</Button>
          }

        </form>
      </div>
    </div>
  )
}
export default CompanySetup;