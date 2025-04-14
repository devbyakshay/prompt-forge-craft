
import React from 'react';
import { BookOpenText, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from 'framer-motion';

interface HeaderProps {
  isLandingPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLandingPage = false }) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full py-4 px-6 md:px-8 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-black/40 fixed top-0 z-10 transition-all duration-300 hover:bg-black/50"
    >
      <Link to="/" className="flex items-center gap-3 group">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow transition-all duration-300 group-hover:shadow-glow-strong"
        >
          <BookOpenText className="w-6 h-6 text-white" />
        </motion.div>
        <motion.h1 
          className="text-xl font-bold gradient-text text-shadow"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Promgine
        </motion.h1>
      </Link>
      
      <div className="flex items-center gap-4">
        {!isLandingPage && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-white/10 bg-black/30 hover:bg-white/10 hidden md:flex"
          >
            <Link to="/">
              Back to Home
            </Link>
          </Button>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-white/10 transition-all duration-300"
                asChild
              >
                <a href="https://github.com/akshayp001" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View on GitHub</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.header>
  );
};

export default Header;
