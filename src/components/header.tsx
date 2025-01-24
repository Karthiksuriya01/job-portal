import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react";
import { BriefcaseBusiness, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const {user} = useUser()
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleOverlay = (e:any) => {
    if(e.target == e.currentTarget){
      setIsMenuOpen(false);
      setSearch({});
    }
  }

  const[search, setSearch] = useSearchParams()

  useEffect(() =>
  {
    if(search.get('sign-in')){
      setIsMenuOpen(true);
    }

  },[search]) 


  return (
    <div className="w-full">
      <nav className="py-4 py-30 flex justify-between items-center border-b">
        <Link to="/">
          <img src="data:image/png;base64,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" className="h-20" alt="Hirrd Logo" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => {setIsMenuOpen(true)}}>Login</Button>
          </SignedOut>
          <SignedIn>
            { user?.unsafeMetadata?.role === 'recruiter' && 
              <Link to={"/post-job"}>
                <Button variant={'destructive'} className="rounded-full">
                  <PenBox size={20} className="mr-2"/>Post a Job</Button>
              </Link> 
            }
            <UserButton
              appearance={{
                elements:{
                  avatarBox:"w-10 h-10",
                }
              }}
            >
             <UserButton.MenuItems>
             <UserButton.Link 
              label="My Jobs"
              labelIcon={<BriefcaseBusiness size={15}/>}
              href="/my-jobs"
             /> 
             </UserButton.MenuItems> 
            </UserButton>
          </SignedIn>

          {
            isMenuOpen && <div onClick={handleOverlay} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center place-items-center">
              <SignIn />
            </div>
          }
        </div>
      </nav>
    </div>
  );
}

export default Header;