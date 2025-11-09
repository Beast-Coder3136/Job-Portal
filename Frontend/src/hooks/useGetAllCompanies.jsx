import { COMPANIES_END_POINT } from "@/constant";
import { setAllCompany } from "@/store/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANIES_END_POINT}/get`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllCompany(res.data.companies));
        }
      }
      catch (err) {
        console.log(err)

      }
    }

    fetchCompanies();
  }, [])
}

export default useGetAllCompanies;