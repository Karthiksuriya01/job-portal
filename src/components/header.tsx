import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react";
import { BriefcaseBusiness, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useSearchParams();

  const handleOverlay = (e: any) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
      setSearch({});
    }
  };

  useEffect(() => {
    if (search.get('sign-in')) {
      setIsMenuOpen(true);
    }
  }, [search]);

  return (
    <div className="w-full">
      <nav className="py-4 px-4 flex justify-between items-center border-b max-w--7xl mx-auto">
        <Link to="/">
          <img src="./logo.png" alt="" className="h-12 w-12" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setIsMenuOpen(true)}>Login</Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === 'recruiter' && 
              <Link to={"/post-job"}>
                <Button variant={'destructive'} className="rounded-full">
                  <PenBox size={20} className="mr-2"/>Post a Job
                </Button>
              </Link> 
            }
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                }
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link 
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                /> 
              </UserButton.MenuItems> 
            </UserButton>
          </SignedIn>

          {isMenuOpen && (
            <div onClick={handleOverlay} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <SignIn />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;