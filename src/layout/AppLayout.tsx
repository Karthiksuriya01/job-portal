import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container relative z-10">
          <Toaster />

        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800">
        Made with 💗 by RoadsideCoder
      </div> 
    </div>
  );
};

export default AppLayout;