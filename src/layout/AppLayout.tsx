import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "YouTube",
  "Instagram",
  "Uber",
  "Spotify",
];

const AppLayout = () => {
  return (
    <div>
      <div className="bg-black"></div>
      <main className="min-h-screen container relative z-10">
     
        
        <Toaster />

        <Header />
       
        <Outlet />
      </main>
      

    </div>
  );
};

export default AppLayout;