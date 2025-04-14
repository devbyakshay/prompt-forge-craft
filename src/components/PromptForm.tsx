
import React, { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Wand2, Loader2, Globe, Mail, Database, Code } from 'lucide-react';
import { Label } from './ui/label';
import { motion } from 'framer-motion';

interface PromptFormProps {
  rawPrompt: string;
  setRawPrompt: (prompt: string) => void;
  promptLength: string;
  setPromptLength: (length: string) => void;
  outputFormat: string;
  setOutputFormat: (format: string) => void;
  focusArea: string;
  setFocusArea: (focus: string) => void;
  isProcessing: boolean;
  onSubmit: () => void;
}

const promptModes = [
  { value: "general", label: "General Prompt Engineer", icon: <Code className="w-5 h-5" /> },
  { value: "website", label: "Website Prompt Engineer", icon: <Globe className="w-5 h-5" /> },
  { value: "email", label: "Email Prompt Engineer", icon: <Mail className="w-5 h-5" /> },
  { value: "backend", label: "Backend Prompt Engineer", icon: <Database className="w-5 h-5" /> },
];

const PromptForm: React.FC<PromptFormProps> = ({
  rawPrompt,
  setRawPrompt,
  promptLength,
  setPromptLength,
  outputFormat,
  setOutputFormat,
  focusArea,
  setFocusArea,
  isProcessing,
  onSubmit
}) => {
  const [selectedMode, setSelectedMode] = useState("general");
  
  return (
    <div className="space-y-6 w-full">
      {/* Prompt Modes */}
      <div className="mb-8">
        <Label className="mb-3 block text-lg font-medium">Prompt Engineering Mode</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {promptModes.map((mode) => (
            <motion.div
              key={mode.value}
              className={`relative overflow-hidden rounded-lg ${
                selectedMode === mode.value 
                  ? "ring-2 ring-primary bg-gradient-to-br from-primary/20 to-secondary/20" 
                  : "bg-black/20 hover:bg-black/30"
              } cursor-pointer transition-all p-4`}
              onClick={() => setSelectedMode(mode.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {selectedMode === mode.value && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-50"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 20%, rgba(74, 144, 226, 0.1) 0%, rgba(74, 144, 226, 0) 70%)",
                      "radial-gradient(circle at 80% 80%, rgba(74, 144, 226, 0.1) 0%, rgba(74, 144, 226, 0) 70%)",
                      "radial-gradient(circle at 50% 20%, rgba(74, 144, 226, 0.1) 0%, rgba(74, 144, 226, 0) 70%)",
                      "radial-gradient(circle at 20% 20%, rgba(74, 144, 226, 0.1) 0%, rgba(74, 144, 226, 0) 70%)",
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              )}
              <div className="flex flex-col items-center text-center justify-center space-y-2 z-10 relative">
                <div className={`p-2 rounded-full ${selectedMode === mode.value ? "bg-primary/20" : "bg-black/20"} mb-1`}>
                  {mode.icon}
                </div>
                <span className="text-sm font-medium">{mode.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="prompt">Your Raw Prompt</Label>
        <Textarea
          id="prompt"
          placeholder="Enter your prompt here... (e.g., 'Write a blog post about AI trends')"
          className="min-h-32 bg-black/20 border-white/10 focus:border-primary/50 transition-all resize-y"
          value={rawPrompt}
          onChange={(e) => setRawPrompt(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="prompt-length">Prompt Length</Label>
          <Select value={promptLength} onValueChange={setPromptLength}>
            <SelectTrigger id="prompt-length" className="bg-black/20 border-white/10">
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent className="bg-promgine-bg-secondary border-white/10">
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
              <SelectItem value="comprehensive">Comprehensive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="output-format">Output Format</Label>
          <Select value={outputFormat} onValueChange={setOutputFormat}>
            <SelectTrigger id="output-format" className="bg-black/20 border-white/10">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent className="bg-promgine-bg-secondary border-white/10">
              <SelectItem value="markdown">Markdown</SelectItem>
              <SelectItem value="plain">Plain Text</SelectItem>
              <SelectItem value="structured">Structured List</SelectItem>
              <SelectItem value="json">JSON Format</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="focus-area">Focus Area</Label>
          <Select value={focusArea} onValueChange={setFocusArea}>
            <SelectTrigger id="focus-area" className="bg-black/20 border-white/10">
              <SelectValue placeholder="Select focus" />
            </SelectTrigger>
            <SelectContent className="bg-promgine-bg-secondary border-white/10">
              <SelectItem value="clarity">Focus on Clarity</SelectItem>
              <SelectItem value="creativity">Emphasize Creativity</SelectItem>
              <SelectItem value="technical">Technical Accuracy</SelectItem>
              <SelectItem value="persuasive">Persuasive Language</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onSubmit}
          disabled={isProcessing || !rawPrompt.trim()}
          className="bg-gradient-primary hover:shadow-glow transition-shadow px-6"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Enhance Prompt
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PromptForm;
