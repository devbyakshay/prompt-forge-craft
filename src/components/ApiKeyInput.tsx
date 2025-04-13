
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Eye, EyeOff, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyInputProps {
  apiKey: string;
  onChange: (key: string) => void;
  onSave: () => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, onChange, onSave }) => {
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();
  
  const handleSaveKey = () => {
    if (!apiKey) {
      toast({
        title: 'API Key Required',
        description: 'Please enter your Gemini API key',
        variant: 'destructive',
      });
      return;
    }
    
    onSave();
    toast({
      title: 'API Key Saved',
      description: 'Your API key has been saved for this session',
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Key className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Gemini API Key</h3>
      </div>
      <p className="text-sm text-white/70">
        Enter your Gemini API key to use Promgine. Your key stays in your browser and is never sent to our servers.
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type={showKey ? 'text' : 'password'}
            placeholder="Enter your Gemini API key"
            value={apiKey}
            onChange={(e) => onChange(e.target.value)}
            className="pr-10 bg-black/20 border-white/10 focus:border-primary/50"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>
        <Button onClick={handleSaveKey} className="bg-gradient-primary hover:shadow-glow transition-shadow">
          Save Key
        </Button>
      </div>
      <div className="text-xs text-white/50">
        Don't have an API key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Get one from Google AI Studio</a>
      </div>
    </div>
  );
};

export default ApiKeyInput;
