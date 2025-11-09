import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminJobsTable() {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.jobs);
  const [filterJob, setFilterJob] = useState(allAdminJobs);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
        ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      )
    })
    setFilterJob(filteredJob);
  }, [searchJobByText])
  return (
    <div className="my-10">
      <Table>
        <TableCaption> A list of your recent registered Companies </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterJob?.length >= 0 ? filterJob?.map((job) => {
              return (
                <TableRow>
                  <TableCell>
                    {job?.company?.name}
                  </TableCell>
                  <TableCell>
                    {job?.title}
                  </TableCell>
                  <TableCell>
                    {job?.createdAt?.split('T')[0]}
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                      <PopoverContent className="w-32 rounded-[0.5rem] bg-white">
                        <div onClick={() => handleEdit(company._id)} className="flex items-center gap-2 w-fit cursor-pointer">
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                          <Eye className='w-4' />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              )
            })
              :
              <span className="font-bold text-xl w-full text-center">No Jobs Found</span>
          }

        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable;