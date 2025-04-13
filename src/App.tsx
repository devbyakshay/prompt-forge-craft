
import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import CustomCursor from '@/components/CustomCursor';

function App() {
  const [customCursorEnabled, setCustomCursorEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('customCursorEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    // Set or remove cursor-none class on body
    document.body.classList.toggle('cursor-none', customCursorEnabled);
    
    // Save preference to localStorage
    localStorage.setItem('customCursorEnabled', JSON.stringify(customCursorEnabled));
    
    return () => {
      document.body.classList.remove('cursor-none');
    };
  }, [customCursorEnabled]);

  return (
    <>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: <LandingPage customCursorEnabled={customCursorEnabled} setCustomCursorEnabled={setCustomCursorEnabled} />,
            errorElement: <NotFound />,
          },
          {
            path: "/tool",
            element: <Index customCursorEnabled={customCursorEnabled} setCustomCursorEnabled={setCustomCursorEnabled} />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ])}
      />
      <CustomCursor isEnabled={customCursorEnabled} />
      <Toaster />
    </>
  );
}

export default App;
