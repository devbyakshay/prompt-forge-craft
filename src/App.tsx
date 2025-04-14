
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import Gallery from '@/pages/Gallery';
import Showcase from '@/pages/Showcase';

function App() {
  return (
    <AuthProvider>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: <LandingPage />,
            errorElement: <NotFound />,
          },
          {
            path: "/tool",
            element: <Index />,
          },
          {
            path: "/gallery",
            element: <Gallery />,
          },
          {
            path: "/showcase",
            element: <Showcase />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ])}
      />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
