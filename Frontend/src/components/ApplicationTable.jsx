import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { space } from "postcss/lib/list";

function ApplicationTable(){
  const {allApplication} = useSelector(store=>store.applications)
  return(
    <div>
      <Table>
        <TableCaption> A list of your Applied Jobs  </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { allApplication.length > 0?
              allApplication.map((item)=>(<TableRow>
                <TableCell>{item?.job?.createdAt}</TableCell>
                <TableCell>{item?.job?.title}</TableCell>
                <TableCell>{item?.job?.company?.name}</TableCell>
                <TableCell className="text-right"><Badge 
                className={" bg-slate-900 text-white " } 
                >{item?.status}</Badge></TableCell>
              </TableRow>))  
              :
              <span className="text-center w-full font-semibold">You have not Applied any Job</span>
            }
          </TableBody>
      </Table>

    </div>
  )
}
export default ApplicationTable;