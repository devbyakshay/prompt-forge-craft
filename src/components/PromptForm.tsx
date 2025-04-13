
import React from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Wand2, Loader2 } from 'lucide-react';
import { Label } from './ui/label';

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
  return (
    <div className="space-y-6 w-full">
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
