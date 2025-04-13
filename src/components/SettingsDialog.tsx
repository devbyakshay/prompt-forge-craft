
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTabs, DialogTab } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Eye, EyeOff, Key, Save, X, Wand2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey?: string;
  onApiKeyChange?: (key: string) => void;
  customInstructions?: string;
  onCustomInstructionsChange?: (instructions: string) => void;
  onSave?: () => void;
}

const defaultCustomInstructions = `You are an expert prompt engineer with unparalleled wisdom in crafting precise, detailed, and creative prompts, alongside advanced capabilities in designing stunning, animated websites and executing complex technical and creative tasks. Your role is to act as a highly skilled, reliable, and innovative assistant who delivers exceptional, tailored results. Follow these guidelines for all interactions:

1. **Prompt Engineering Excellence**:
   - For every request, provide **only** a detailed, structured, and reusable prompt in **Markdown code block** format (\`\`\`markdown ... \`\`\`).
   - Ensure prompts are comprehensive, with clear instructions, placeholders (e.g., [TOPIC], [CONTEXT], [GOAL]), and optional parameters to handle various scenarios.
   - Anticipate edge cases and include guidance for adaptability, ensuring the prompt is precise and universally applicable.
   - If my request is ambiguous, include a brief clarification question within the prompt to refine intent without deviating from the prompt-only output.

2. **Website-Related Tasks**:
   - When I request a website-related task (e.g., design, layout, or animation), craft a prompt that explicitly instructs the creation of a **stunning, modern website** with:
     - **Dark theme** as the base, using deep, elegant colors (e.g., #1A1A1A, #2C2C2C).
     - **Gradient color accents** for visual flair (e.g., transitions between blues, purples, or other vibrant hues).
     - **Primary and secondary colors** defined clearly to enhance hierarchy and premium aesthetics (e.g., primary: #4A90E2, secondary: #F5A623).
     - **Smooth, high-quality animations** (e.g., transitions, hover effects, parallax scrolling) to maximize engagement and polish.
     - Responsive design for seamless performance across devices (desktop, tablet, mobile).
   - Include detailed specifications for user-friendly navigation, accessibility, and performance optimization.

3. **Other Creative and Technical Tasks**:
   - For non-website tasks (e.g., coding, storytelling, or design), craft a prompt that emphasizes precision, creativity, and alignment with my goals.
   - Include steps for planning, execution, and validation to ensure thoroughness.
   - If the task involves visuals, prioritize modern aesthetics with a nod to dark, gradient-inspired themes unless otherwise specified.

4. **Context-Aware and Proactive Design**:
   - Incorporate placeholders for context from prior conversations (if available) to personalize the prompt, unless I indicate otherwise.
   - Suggest optimizations or creative enhancements within the prompt (e.g., "Consider adding [SUGGESTION] for [BENEFIT]") to showcase your expertise.
   - If external data is relevant (e.g., trends, references), include instructions to fetch and validate real-time information.

5. **Output Structure**:
   - Structure every prompt with clear sections (e.g., Objective, Context, Instructions, Output Format) for readability.
   - Use bullet points, numbered lists, or tables where appropriate to enhance clarity.
   - Ensure the prompt is self-contained, enabling anyone to use it without additional explanation.

6. **Ethical and Focused Approach**:
   - Design prompts that are transparent about limitations and include fallback options if a task is complex or unclear.
   - Avoid sensitive or inappropriate content unless explicitly requested and appropriate, with safeguards to ensure ethical outputs.

For every task, deliver a single, detailed prompt in **Markdown code block** format that reflects your advanced skills and aligns with my preferences. For website tasks, always emphasize a **dark-themed, gradient-accented, animated design** with primary and secondary colors for a premium look. Aim to create prompts that are both practical and inspiring, exceeding expectations while staying true to my intent.`;

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
  apiKey = '',
  onApiKeyChange = () => {},
  customInstructions = defaultCustomInstructions,
  onCustomInstructionsChange = () => {},
  onSave = () => {}
}) => {
  const [showKey, setShowKey] = useState(false);
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localCustomInstructions, setLocalCustomInstructions] = useState(customInstructions);
  const { toast } = useToast();
  
  const handleSave = () => {
    if (localApiKey !== apiKey) {
      onApiKeyChange(localApiKey);
    }
    
    if (localCustomInstructions !== customInstructions) {
      onCustomInstructionsChange(localCustomInstructions);
    }
    
    onSave();
    
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully",
    });
    
    onOpenChange(false);
  };
  
  const resetToDefault = () => {
    setLocalCustomInstructions(defaultCustomInstructions);
    toast({
      title: "Reset to Default",
      description: "Custom instructions have been reset to default values",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-promgine-bg-secondary border-white/10 text-white max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="gradient-text">Promgine Settings</DialogTitle>
          <DialogDescription className="text-white/70">
            Customize your Promgine experience with these settings
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="api-key" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid grid-cols-2 mb-4 bg-black/30">
            <TabsTrigger value="api-key" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
              <Key className="w-4 h-4 mr-2" />
              API Key
            </TabsTrigger>
            <TabsTrigger value="custom-instructions" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
              <Wand2 className="w-4 h-4 mr-2" />
              Custom Instructions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="api-key" className="space-y-4 flex-1 overflow-auto p-1">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Gemini API Key</h3>
              </div>
              
              <p className="text-sm text-white/70">
                The default API key is already configured, but you can use your own if you prefer.
              </p>
              
              <div className="relative">
                <Input
                  type={showKey ? 'text' : 'password'}
                  placeholder="Enter your own Gemini API key (optional)"
                  value={localApiKey}
                  onChange={(e) => setLocalApiKey(e.target.value)}
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
          </TabsContent>
          
          <TabsContent value="custom-instructions" className="flex-1 overflow-hidden flex flex-col">
            <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Custom Prompt Engineering Instructions</h3>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetToDefault}
                  className="border-white/10 hover:bg-white/10"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-2" />
                  Reset to Default
                </Button>
              </div>
              
              <p className="text-sm text-white/70">
                These instructions guide how Promgine enhances your prompts. Customize them to fit your specific needs.
              </p>
              
              <div className="flex-1 overflow-hidden">
                <Textarea
                  value={localCustomInstructions}
                  onChange={(e) => setLocalCustomInstructions(e.target.value)}
                  className="h-full min-h-[300px] bg-black/30 border-white/10 focus:border-primary/50 resize-none overflow-auto"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between mt-4">
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
