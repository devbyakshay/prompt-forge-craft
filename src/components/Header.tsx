
import React, { useState } from 'react';
import { BookOpenText, Github, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  isLandingPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLandingPage = false }) => {
  const { user, signInWithGoogle, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/tool" className={`text-sm ${isLandingPage || location.pathname === '/tool' ? 'text-white' : 'text-white/70 hover:text-white'} transition-colors`}>
          Tool
        </Link>
        <Link to="/gallery" className={`text-sm ${location.pathname === '/gallery' ? 'text-white' : 'text-white/70 hover:text-white'} transition-colors`}>
          Gallery
        </Link>
        <Link to="/showcase" className={`text-sm ${location.pathname === '/showcase' ? 'text-white' : 'text-white/70 hover:text-white'} transition-colors`}>
          Showcase
        </Link>
      </div>
      
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
        
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="border border-white/10 rounded-full overflow-hidden h-8 w-8 p-0"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/80 border-white/10 backdrop-blur-md">
              <DropdownMenuItem
                onClick={logout}
                className="flex items-center gap-2 cursor-pointer hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="hover:bg-white/10 transition-all duration-300"
                  onClick={signInWithGoogle}
                >
                  <LogIn className="w-4 h-4" />
                  <span className="sr-only">Sign In</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sign In with Google</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden hover:bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10 py-4 px-6 md:hidden"
        >
          <nav className="flex flex-col gap-4">
            <Link 
              to="/tool" 
              className="p-2 hover:bg-white/5 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tool
            </Link>
            <Link 
              to="/gallery" 
              className="p-2 hover:bg-white/5 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              to="/showcase" 
              className="p-2 hover:bg-white/5 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Showcase
            </Link>
            {!isLandingPage && (
              <Link 
                to="/" 
                className="p-2 hover:bg-white/5 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Back to Home
              </Link>
            )}
            {!user && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2 border-white/10 bg-black/30 hover:bg-white/10"
                onClick={() => {
                  signInWithGoogle();
                  setMobileMenuOpen(false);
                }}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In with Google
              </Button>
            )}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
