import App from "@/App";
import Navbar from "../shared/navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useParams } from "react-router-dom";
import useGetAllApplicants from "@/hooks/useGetAllApplicants";
import { useSelector } from "react-redux";

function Applicants() {
  const params = useParams();
  const jobId = params.id;
    const { Applicants } = useSelector(store => store.applications);
  useGetAllApplicants(jobId);
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>Applicants {Applicants.length} </h1>
        <ApplicantsTable />
      </div>
    </div>
  )
}
export default Applicants;