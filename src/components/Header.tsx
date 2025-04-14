
import React, { useState } from 'react';
import { BookOpenText, Github, Menu, X, LogIn, LogOut, User, UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
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
  const { user, signInWithGoogle, logout, signInAnonymously } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      navigate(path);
    };
  };

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
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/tool" 
            className={`text-sm ${isLandingPage || location.pathname === '/tool' ? 'text-white' : 'text-white/70 hover:text-white'} transition-colors px-3 py-2 rounded-md hover:bg-white/10`}
            onClick={handleNavigate('/tool')}
          >
            Tool
          </Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/gallery" 
            className={`text-sm ${location.pathname === '/gallery' ? 'text-white' : 'text-white/70 hover:text-white'} transition-colors px-3 py-2 rounded-md hover:bg-white/10`}
            onClick={handleNavigate('/gallery')}
          >
            Gallery
          </Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/showcase" 
            className={`text-sm ${location.pathname === '/showcase' ? 'text-white' : 'text-white/70 hover:text-white'} transition-colors px-3 py-2 rounded-md hover:bg-white/10`}
            onClick={handleNavigate('/showcase')}
          >
            Showcase
          </Link>
        </motion.div>
      </div>
      
      <div className="flex items-center gap-4">
        {!isLandingPage && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleNavigate('/')}
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
                className="border border-white/10 rounded-full overflow-hidden h-8 w-8 p-0 hover:border-primary/50 hover:shadow-glow transition-all duration-300"
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="hover:bg-white/10 transition-all duration-300 flex gap-2 items-center hover:shadow-glow"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/80 border-white/10 backdrop-blur-md w-48">
              <DropdownMenuItem
                onClick={signInWithGoogle}
                className="flex items-center gap-2 cursor-pointer hover:bg-white/10"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={signInAnonymously}
                className="flex items-center gap-2 cursor-pointer hover:bg-white/10"
              >
                <UserPlus className="h-4 w-4" />
                <span>Guest Mode</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-white/10 transition-all duration-300 hover:shadow-glow"
                  asChild
                >
                  <a href="https://github.com/akshayp001" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
              </motion.div>
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
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/tool" 
                className="p-2 hover:bg-white/5 rounded-md transition-colors block"
                onClick={handleNavigate('/tool')}
              >
                Tool
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/gallery" 
                className="p-2 hover:bg-white/5 rounded-md transition-colors block"
                onClick={handleNavigate('/gallery')}
              >
                Gallery
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/showcase" 
                className="p-2 hover:bg-white/5 rounded-md transition-colors block"
                onClick={handleNavigate('/showcase')}
              >
                Showcase
              </Link>
            </motion.div>
            
            {!isLandingPage && (
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/" 
                  className="p-2 hover:bg-white/5 rounded-md transition-colors block"
                  onClick={handleNavigate('/')}
                >
                  Back to Home
                </Link>
              </motion.div>
            )}
            
            {!user && (
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 bg-black/30 hover:bg-white/10 hover:shadow-glow transition-all duration-300"
                  onClick={() => {
                    signInWithGoogle();
                    setMobileMenuOpen(false);
                  }}
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign In with Google
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 bg-black/30 hover:bg-white/10 hover:shadow-glow transition-all duration-300"
                  onClick={() => {
                    signInAnonymously();
                    setMobileMenuOpen(false);
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Continue as Guest
                </Button>
              </div>
            )}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
