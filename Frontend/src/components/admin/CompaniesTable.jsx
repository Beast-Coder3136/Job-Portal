import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { all } from "axios";

function CompaniesTable() {
  const { allCompany, searchCompanyByText } = useSelector(store => store.company);
  const navigate = useNavigate()
  const [filterCompany, setFilterCompany] = useState(allCompany);
  const handleEdit = (companyId)=>{
    navigate(`/admin/companies/${companyId}`);
  }
  useEffect(()=>{
    const filteredCompany = allCompany.length >= 0 &&  allCompany.filter((company)=>{
      if(!searchCompanyByText){
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filteredCompany);
  },[searchCompanyByText,allCompany])
  return (
    <div className="my-10">
      <Table>
        <TableCaption> A list of your recent registered Companies </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length == 0 ? <span className="font-bold " > No Company Found </span> :
            filterCompany.map((company) => {
              return (
                <>
                  <TableRow>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={company.logo} />
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      {company.name}
                    </TableCell>
                    <TableCell>
                      {company.createdAt.split('T')[0]}
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                        <PopoverContent className="w-32 rounded-[0.5rem] bg-white">
                          <div onClick={()=>handleEdit(company._id)} className="flex items-center gap-2 w-fit cursor-pointer">
                            <Edit2 className="w-4"   />
                            <span>Edit</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                </>
              )
            })

          }

        </TableBody>
      </Table>
    </div>
  )
}
export default CompaniesTable;