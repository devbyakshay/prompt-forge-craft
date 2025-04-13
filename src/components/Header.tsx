
import React from 'react';
import { BookOpenText, Github, Settings } from 'lucide-react';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeaderProps {
  onOpenSettings?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <header className="w-full py-4 px-6 md:px-8 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-black/40 fixed top-0 z-10 transition-all duration-300 hover:bg-black/50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow transition-all duration-300 hover:shadow-glow-strong">
          <BookOpenText className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold gradient-text text-shadow animate-pulse-gradient">Promgine</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-white/10 transition-all duration-300"
                onClick={onOpenSettings}
              >
                <Settings className="w-5 h-5 hover:rotate-90 transition-transform duration-500" />
                <span className="sr-only">Settings</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>API Key Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-white/10 transition-all duration-300"
                asChild
              >
                <a href="https://github.com/your-repo/promgine" target="_blank" rel="noopener noreferrer">
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
    </header>
  );
};

export default Header;
