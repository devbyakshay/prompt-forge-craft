
import React from 'react';
import { BookOpenText, Github } from 'lucide-react';
import { Button } from './ui/button';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 md:px-8 flex items-center justify-between border-b border-white/10 backdrop-blur-sm bg-black/20 fixed top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
          <BookOpenText className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold gradient-text text-shadow">Promgine</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-white/5"
          asChild
        >
          <a href="https://github.com/your-repo/promgine" target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
