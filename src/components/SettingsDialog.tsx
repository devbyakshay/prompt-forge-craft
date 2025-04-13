
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Eye, EyeOff, Key, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onSave: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
  apiKey,
  onApiKeyChange,
  onSave
}) => {
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();
  
  const handleSave = () => {
    onSave();
    toast({
      title: "Settings saved",
      description: "Your API key settings have been updated",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-promgine-bg-secondary border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="gradient-text">API Key Settings</DialogTitle>
          <DialogDescription className="text-white/70">
            The default API key is already configured, but you can use your own if you prefer.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Custom Gemini API Key</h3>
          </div>
          
          <div className="relative">
            <Input
              type={showKey ? 'text' : 'password'}
              placeholder="Enter your own Gemini API key (optional)"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              className="pr-10 bg-black/30 border-white/10 focus:border-primary/50"
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
          
          <p className="text-xs text-white/50">
            Don't have an API key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Get one from Google AI Studio</a>
          </p>
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-white/10 hover:bg-white/10"
          >
            <X className="w-4 h-4 mr-2" /> Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-primary hover:shadow-glow transition-shadow"
          >
            <Save className="w-4 h-4 mr-2" /> Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
