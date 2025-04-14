
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
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
            path: "*",
            element: <NotFound />,
          },
        ])}
      />
      <Toaster />
    </>
  );
}

export default App;
