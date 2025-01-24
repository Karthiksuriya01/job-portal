import { getSingleJob } from "@/api/apiJobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { BarLoader } from "react-spinners";

const JobPage = () => {

  const {isLoaded} = useUser()
  const {id} = useParams()

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getSingleJob, {
    job_id : id
  });


  useEffect(() => 
  {
    if(isLoaded) fnJobs()
  },[isLoaded])

  if(isLoaded || loadingJobs) return <BarLoader/>;

  return (
    <div>
      <div>
        <h1 className="text-white">{jobs?.title}</h1>
      </div>
    </div>
  );
}

export default JobPage;
