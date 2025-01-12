
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Onboarding from './pages/Onboarding';
import JobListing from './pages/JobListing';
import PostJob from './pages/PostJob';
import MyJobs from './pages/MyJobs';
import SavedJobs from './pages/SavedJobs';
import JobPage from './pages/JobPage';
import AppLayout from './layout/AppLayout';
import './App.css';
import { ThemeProvider } from './components/ui/theme-provider';




const App = () => {

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Landingpage />,
        },
        {
          path: "/onboarding",
          element: (
    
              <Onboarding />
           
          ),
        },
        {
          path: "/jobs",
          element: (
            
              <JobListing />
      
          ),
        },
        {
          path: "/post-job",
          element: (

              <PostJob />
      
          ),
        },
        {
          path: "/my-jobs",
          element: (
            
              <MyJobs />
  
          ),
        },
        {
          path: "/saved-jobs",
          element: (
          
              <SavedJobs />
            
          ),
        },
        {
          path: "/job/:id",
          element: (
          
              <JobPage />
          
          ),
        },
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
    
   
  );
}

export default App;
