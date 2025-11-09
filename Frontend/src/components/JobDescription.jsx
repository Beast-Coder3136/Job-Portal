import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import useGetSingleJob from "@/hooks/useGetSingleJob";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/store/jobSlice";
import axios from "axios";
import { APPLICATION_END_POINT, JOBS_END_POINT } from "@/constant";
import { toast } from "sonner";

function JobDescription() {
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.jobs);
    const { user } = useSelector(store => store.auth);
    const params = useParams();
    const jobId = params.id;
    const initialApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false;
    let [isApplied, setisApplied] = useState(initialApplied);

    const handleApplyJob = async () => {
        try {
            const res = await axios.post(`${APPLICATION_END_POINT}/apply/${jobId}`, {}, { withCredentials: true })
            if (res.data.success) {
                setisApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }

    useEffect(() => {
        const fetchJobByid = async () => {
            try {
                const res = await axios.get(`${JOBS_END_POINT}/get/${jobId}`, { withCredentials: true });
                console.log(res.data.job);
                if (res.data.success) {
                    console.log(res.data.job);
                    dispatch(setSingleJob(res.data.job));
                    setisApplied(res.data.job.applications.some(application => application.applicant == user?._id))
                }
            } catch (err) {
                console.log(err);
            }

        }
        fetchJobByid();
    }, [jobId, dispatch,isApplied]);
    const job = singleJob;

    return (
        <div className='max-w-7xl mx-auto my-10 text-text-secondary'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl text-text-primary'>{job?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'bg-[#ef4444]  text-white  border border-border'} variant="ghost"> {job?.position} Positions</Badge>
                        <Badge className={'bg-[#06b6d4] text-white border border-border'} variant="ghost">{job?.jobType}</Badge>
                        <Badge className={'bg-[#22c55e] text-white border border-border'} variant="ghost">{job?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : handleApplyJob}
                    disabled={isApplied}
                    className={`rounded-[0.5rem] ${isApplied ? 'bg-gray-600 text-black cursor-not-allowed' : 
                    'bg-[#3b82f6]  text-white'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}

                </Button>
            </div>
            <h1 className='border-b-2 border-border text-text-secondary font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal '>{job?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal '>
                    {job?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal '>{job?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal '> {job?.experienceLevel}yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal '>
                    {job?.salary}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal '>{job?.applications.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal '>{job?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription;