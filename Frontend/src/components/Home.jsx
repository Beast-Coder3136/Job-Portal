import { useSelector } from "react-redux";
import CategoryCrousal from "./CategoryCrousal";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/footer";
import Navbar from "./shared/navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  useGetAllJobs();
  useEffect(() => {
    if (user?.role == 'recruiter') {
      navigate('/admin/companies');
    }
  }, [])
  return (
    <>
      <div className="">
        <Navbar></Navbar>
        <HeroSection></HeroSection>
        <CategoryCrousal></CategoryCrousal>
        <LatestJobs></LatestJobs>
        <Footer></Footer>
      </div>

    </>
  )
}

export default Home;