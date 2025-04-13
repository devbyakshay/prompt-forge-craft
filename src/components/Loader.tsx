
import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', text }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <motion.div 
          className={`${sizeClasses[size]} rounded-full border-2 border-white/10 border-t-primary border-r-primary/70`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <motion.div 
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-transparent border-b-accent/40`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.15 }}
        ></motion.div>
      </div>
      {text && (
        <motion.p 
          className="text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
