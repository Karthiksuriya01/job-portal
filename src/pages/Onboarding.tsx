import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@clerk/clerk-react';
import { ToastAction } from '@radix-ui/react-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { BarLoader } from 'react-spinners';


const Onboarding = () => {

  const { toast } = useToast()

  const navigate = useNavigate()
  const {user,isLoaded} = useUser()
  const handlerole = async (role:string) =>
  {
    await user.update({unsafeMetadata: {role}}).then(() =>{
      toast({
        variant: "default",
        title: "Role selected",
        description: `You have selected the role of ${role}.`
      });
           navigate(role == 'candidate' ? '/jobs' : '/post-job')
      })
      .catch((error) => {
        console.log(error)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
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
