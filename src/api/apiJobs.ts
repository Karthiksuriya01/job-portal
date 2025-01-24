import supabaseClient from "@/utils/supabase";

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


export async function getSingleJob(token,{job_id}) {
    const supabase = await supabaseClient(token);
    
    // Debugging: Log the job_id being fetched
    console.log("Fetching Job with ID:", job_id);

    const { data, error } = await supabase.from("jobs").select("*, company:companies(name,logo_url)")
    .eq("id", job_id)
    .single();
  
    // Debugging: Log the fetched data and error
    console.log("Fetched Single Job Data:", data);
    console.log("Error fetching Single Job:", error);
  
    if (error) {
      console.error("Error fetching Job:", error);
      return null;
    }
  
    return data;
}
  
// - job isOpen toggle - (recruiter_id = auth.uid())
export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Updating Hiring Status:", error);
    return null;
  }

  return data;
}


// - post job
export async function addNewJob(token, _, jobData) {
    const supabase = await supabaseClient(token);
  
    const { data, error } = await supabase
      .from("jobs")
      .insert([jobData])
      .select();
  
    if (error) {
      console.error(error);
      throw new Error("Error Creating Job");
    }
  
    return data;
  }

  
// get my created jobs
export async function getMyJobs(token, { recruiter_id }) {
    const supabase = await supabaseClient(token);
  
    const { data, error } = await supabase
      .from("jobs")
      .select("*, company: companies(name,logo_url)")
      .eq("recruiter_id", recruiter_id);
  
    if (error) {
      console.error("Error fetching Jobs:", error);
      return null;
    }
  
    return data;
  }


  // Delete job
export async function deleteJob(token, { job_id }) {
    const supabase = await supabaseClient(token);
  
    const { data, error: deleteError } = await supabase
      .from("jobs")
      .delete()
      .eq("id", job_id)
      .select();
  
    if (deleteError) {
      console.error("Error deleting job:", deleteError);
      return data;
    }
  
    return data;
  }