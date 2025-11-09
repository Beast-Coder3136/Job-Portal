
import { useSelector } from "react-redux";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import App from "@/App";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, Cross, MoreHorizontal, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_END_POINT } from "@/constant";
import { useEffect, useState } from "react";

function ApplicantsTable() {
  const { Applicants } = useSelector(store => store.applications);

  let [applicants, setApplicants] = useState(Applicants);

  const handleStatus = async (status, id) => {
    try {
      const res = await axios.post(`${APPLICATION_END_POINT}/update/status/${id}`, {
        status
      },
        { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        setApplicants(prev =>
          prev.map(applicant =>
            applicant._id === id ? { ...applicant, status } : applicant
          )
        );
      }
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }
  useEffect(() => {
  }, [applicants])

  return (
    <div>
      <Table>
        <TableCaption>A list of user who applied for job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            applicants.length > 0 && applicants.map((applicant) => {
              return (
                <TableRow key={applicant._id}>
                  <TableCell>{applicant?.applicant?.fullname}</TableCell>
                  <TableCell>{applicant?.applicant?.email}</TableCell>
                  <TableCell>{applicant?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {
                      applicant?.applicant?.profile?.resume ?
                        <a className="text-blue-400 underline cursor-pointer"
                          href={applicant?.applicant?.profile?.resume} target="blank">Resume</a>
                        :
                        <span> NA </span>
                    }

                  </TableCell>
                  <TableCell>{
                    applicant?.createdAt.split("T")[0]
                  }</TableCell>
                  <TableCell>{
                    applicant.status === "pending" ?  <Badge variant={"outline"} className="py-1"
                    >{applicant?.status}</Badge> 
                    :
                    applicant.status === "accepted" ? 
                     <Badge variant={"outline"} className="bg-blue-600 text-white py-1"
                    >{applicant?.status}</Badge> 
                    : 
                     <Badge variant={"outline"} 
                    className="bg-red-600 text-white py-1"
                    >{applicant?.status}</Badge> 
                    
                  }
                  </TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover >
                      <PopoverTrigger >
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="rounded-[0.5rem] bg-white" >

                        <div onClick={() => handleStatus("accepted", applicant?._id)} className="flex items-center gap-3 w-fit cursor-pointer mb-3">
                          <Check />
                          <span>Accepted</span>
                        </div>
                        <div onClick={() => handleStatus("rejected", applicant?._id)} className="flex items-center gap-3 w-fit cursor-pointer ">
                          <X />
                          <span>Rejected</span>
                        </div>

                      </PopoverContent>
                    </Popover>
                  </TableCell>

                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable;