
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from '@/contexts/AuthContext';
import Gallery from '@/pages/Gallery';
import Showcase from '@/pages/Showcase';
import PageTransition from '@/components/PageTransition';
import Loader from '@/components/Loader';

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PageTransition><LandingPage /></PageTransition>,
    errorElement: <NotFound />,
  },
  {
    path: "/tool",
    element: <PageTransition><Index /></PageTransition>,
  },
  {
    path: "/gallery",
    element: <PageTransition><Gallery /></PageTransition>,
  },
  {
    path: "/showcase",
    element: <PageTransition><Showcase /></PageTransition>,
  },
  {
    path: "*",
    element: <PageTransition><NotFound /></PageTransition>,
  },
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating app initialization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds for initial loading
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <RouterProvider router={AppRoutes} />
      </AnimatePresence>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
