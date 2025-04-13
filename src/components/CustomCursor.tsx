
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <>
          <motion.div
            className="custom-cursor-outer pointer-events-none fixed z-50 mix-blend-difference"
            animate={{
              x: position.x - 16,
              y: position.y - 16,
              scale: clicked ? 0.8 : 1,
            }}
            transition={{ type: "spring", damping: 15 }}
            style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              border: '2px solid white'
            }}
          />
          <motion.div
            className="custom-cursor-inner pointer-events-none fixed z-50 mix-blend-difference"
            animate={{
              x: position.x - 4,
              y: position.y - 4,
              scale: clicked ? 1.5 : 1,
            }}
            transition={{ type: "spring", damping: 10 }}
            style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: 'white' 
            }}
          />
        </>
      )}
    </>
  );
};

export default CustomCursor;
