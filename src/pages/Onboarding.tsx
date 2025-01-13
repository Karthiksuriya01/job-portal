import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { BarLoader } from 'react-spinners';


const Onboarding = () => {
  const navigate = useNavigate()
  const {user,isLoaded} = useUser()
  const handlerole = async (role:string) =>
  {
    await user.update({unsafeMetadata: {role}}).then(() =>{
           navigate(role == 'candidate' ? '/jobs' : '/post-job')
      })
      .catch((error) => {
        console.log(error)
      })    
  }
  useEffect(()=>
    {
      if(user?.unsafeMetadata?.role){
        navigate(user?.unsafeMetadata?.role == 'candidate' ? '/jobs' : '/post-job')

      }
      
    },[user,navigate])
    
  if(!isLoaded){
    return <BarLoader className='mb-4' width={"100%"} color="#36d7b7"/>
  }
  
  return (
    <div>
      <h2>I am ....</h2>
      <div className='gap-8 flex justify-center place-items-center'>
        <Button variant="destructive" onClick={() => handlerole('candidate')}>Candidate</Button>
        <Button variant="default" onClick={() => handlerole('recuriter')}>Job Seeker</Button>
      </div>
    </div>
  );
}

export default Onboarding;
