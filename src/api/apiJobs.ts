import supabaseClient from "@/utils/supabase";

// Define the Job interface
interface Job {
    title: string;
    company?: {
        logo_url?: string;
    };
    // Add other properties as needed
}

export async function getJobs(token:string,{location,company_id,searchQuery}:any) //token coming from clerk
{
    const supabase = await supabaseClient(token);

    //query
    let query = supabase.from('jobs').select("*, company:companies(name,logo_url), save:saved_jobs(id)"); // we are gettin everything from jobs table and used foreign key relation

    if(location)
    {
        query = query.eq('location',location)
    }
    if(company_id)
        {
            query = query.eq('company_id',company_id)
        }
    if(searchQuery)
        {
            query = query.ilike('title',`%${searchQuery}%`)
        }



    const {data, error} = await query 

    if(error){
        console.log(error);
        return null
    }
    return data
}


export async function getSingleJob(token: string, { job_id }: { job_id: string }): Promise<Job | null> {
    const supabase = await supabaseClient(token);
    const query = supabase
      .from("jobs")
      .select(
        "*, company: companies(name,logo_url), applications: applications(*)"
      )
      .eq("id", job_id)
      .single();
  
    const { data, error } = await query;
  
    if (error) {
      console.error("Error fetching Job:", error);
      return null;
    }
  
    return data as Job;
}

