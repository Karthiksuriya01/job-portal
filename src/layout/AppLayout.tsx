import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container relative w-full ">
     
        
        <Toaster />

        <Header />
       
        <Outlet />
      </main>
      

    </div>
  );
};

export default AppLayout;