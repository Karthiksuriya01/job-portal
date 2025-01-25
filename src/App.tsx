import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Onboarding from './pages/Onboarding';
import JobListing from './pages/JobListing';
import PostJob from './pages/post-job';
import MyJobs from './pages/MyJobs';
import SavedJobs from './pages/SavedJobs';
import JobPage from './pages/job';
import AppLayout from './layout/AppLayout';
import './App.css';
import { ThemeProvider } from './components/ui/theme-provider';
import ProtectedRoute from './components/Protected-route';

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Landingpage />
        },
        {
          path: "onboarding",
          element: (
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          ),
        },
        {
          path: "jobs",
          element: (
            <ProtectedRoute>
              <JobListing />
            </ProtectedRoute>
          ),
        },
        {
          path: "post-job",
          element: (
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          ),
        },
        {
          path: "my-jobs",
          element: (
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          ),
        },
        {
          path: "saved-jobs",
          element: (
            <ProtectedRoute>
              <SavedJobs />
            </ProtectedRoute>
          ),
        },
        {
          path: "job/:id",
          element: (
            <ProtectedRoute>
              <JobPage />
            </ProtectedRoute>
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
