
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from '@/contexts/AuthContext';
import Gallery from '@/pages/Gallery';
import Showcase from '@/pages/Showcase';
import PageTransition from '@/components/PageTransition';
import { Loader } from '@/components/Loader';

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
    // Simulating app initialization - could be checking auth status, loading configs, etc.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds for initial loading
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            className="w-24 h-24 rounded-full bg-gradient-primary mx-auto flex items-center justify-center mb-6"
            animate={{
              boxShadow: [
                "0 0 20px rgba(74, 144, 226, 0.3)",
                "0 0 40px rgba(74, 144, 226, 0.6)",
                "0 0 20px rgba(74, 144, 226, 0.3)"
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
              <path d="m15 5 4 4"/>
            </motion.svg>
          </motion.div>
          <motion.h1
            className="text-2xl font-bold gradient-text"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Promgine
          </motion.h1>
          <motion.p
            className="text-white/70 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading your AI prompt engineer...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <RouterProvider router={AppRoutes} />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
