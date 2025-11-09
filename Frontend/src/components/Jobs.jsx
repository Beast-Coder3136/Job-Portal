import { space } from "postcss/lib/list";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import Navbar from "./shared/navbar";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useEffect, useState } from "react";
import { all } from "axios";
import { motion } from "framer-motion";

function Jobs() {
  useGetAllJobs();
  const { allJobs, searchQueryText } = useSelector((store) => store.jobs);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  useEffect(() => {
    if (searchQueryText) {
      const filteredJobs = allJobs.filter((job) => {
        return (job?.title?.toLowerCase().includes(searchQueryText.toLowerCase())) ||
          (job?.description?.toLowerCase().includes(searchQueryText.toLowerCase())) ||
          (job?.location?.toLowerCase().includes(searchQueryText.toLowerCase()))
      })
      setFilterJobs(filteredJobs);
    }
    else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchQueryText])
  return (
    <>
      <div className=" h-full">
        <Navbar></Navbar>
        <div className="max-w-7xl mx-auto mt-5">
          <div className="flex gap-5">
            <div className="w-[20%]">
              <FilterCard></FilterCard>
            </div>

            {filterJobs.length == 0 ? <span>Job Not found </span>
              :
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5 ">
                <div className="grid grid-cols-3 gap-4">
                  {
                    filterJobs.map((job) => <div>
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        key={job?._id}
                      >
                        <JobCard job={job} key={job?._id} />
                      </motion.div>
                    </div>)
                  }

                </div >
              </div>
            }


          </div>
        </div>

      </div>
    </>
  )
}

export default Jobs;
