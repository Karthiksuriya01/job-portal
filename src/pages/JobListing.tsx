import { getJobs } from '@/api/apiJobs';
import { useSession } from '@clerk/clerk-react';
import { useEffect } from 'react';

const JobListing = () => {
  const { session, isLoaded } = useSession();

  const fetchJobs = async () => {
    try {
      if (!session) {
        console.log("No active session");
        return;
      }

      const supabaseAccessToken = await session.getToken({
        template: 'supabase',
      });
      const data = await getJobs(supabaseAccessToken);
      console.log(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && session) {
      fetchJobs();
    }
  }, [isLoaded, session]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Job</h1>
    </div>
  );
};

export default JobListing;
