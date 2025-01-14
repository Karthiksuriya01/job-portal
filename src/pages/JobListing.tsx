import { getJobs } from '@/api/apiJobs';
import JobCard from '@/components/jobcard';
import useFetch from '@/hooks/useFetch';
import { useSession } from '@clerk/clerk-react';
import { Divide } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

const JobListing = () => {
  // without using hook
  // const { session, isLoaded } = useSession();

  // const fetchJobs = async () => {
  //   try {
  //     if (!session) {
  //       console.log("No active session");
  //       return;
  //     }

  //     const supabaseAccessToken = await session.getToken({
  //       template: 'supabase',
  //     });
  //     const data = await getJobs(supabaseAccessToken);
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching jobs:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (isLoaded && session) {
  //     fetchJobs();
  //   }
  // }, [isLoaded, session]);

  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }


  // using hook
  
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const {isLoaded } = useSession();

  
  const {data:jobs,loading:jobLoading,error:error,fn:jobFn,} = useFetch<any[]>(getJobs,{
    location,
    company_id,
    searchQuery
  })

  useEffect(() => {
    jobFn();
  }, [isLoaded,location,company_id,searchQuery]);

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />;
  }
  return (
    <div>
      <h1>Jobs list</h1>

      {
        jobLoading && <BarLoader className='mb-4' width={'100%'} color='#36d7b7' /> 
      }

      {jobLoading == false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length? (
            jobs.map((job) => 
            {
              return <JobCard key={job.id} job = {job}/>
            })
          ):
          (
            <div>No jobs Found</div>
          )
          }
        </div>
      )}
    </div>
        
  )
}

export default JobListing;
