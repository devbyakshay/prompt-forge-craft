
import React from 'react';

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
        <div className={`${sizeClasses[size]} rounded-full border-2 border-white/10 border-t-primary border-r-primary/70 animate-spin-slow`}></div>
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-transparent border-b-accent/40 animate-spin-slow animation-delay-150`}></div>
      </div>
      {text && <p className="text-white/70 animate-pulse">{text}</p>}
    </div>
  );
};

export default Loader;
