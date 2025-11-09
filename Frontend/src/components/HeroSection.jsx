import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQueryText } from "@/store/jobSlice";

function HeroSection() {
  const [qeury, setQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchQuery = ()=>{
    dispatch(setSearchQueryText(qeury));
    navigate("/browse");
  }

  return (
    <div className="text-center ">
      <div className='flex flex-col gap-5 my-10'>
        <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-text-secondary font-medium'>No. 1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#8b5cf6]'>Dream Jobs</span></h1>

        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input
            type="text"
            placeholder='Find your dream jobs'
            onChange={(e)=>{setQuery(e.target.value)}}
            className='outline-none border-none w-full '

          />
          <Button className="rounded-r-full bg-[#6A38C2]" 
          onClick={handleSearchQuery} >
            <Search className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;