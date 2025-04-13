
import React from 'react';
import { Button } from './ui/button';
import { Download, Copy, FileText, FileImage, File, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import { Card } from './ui/card';
import { motion } from 'framer-motion';

interface PromptOutputProps {
  enhancedPrompt: string;
}

const PromptOutput: React.FC<PromptOutputProps> = ({ enhancedPrompt }) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(enhancedPrompt);
      setCopied(true);
      toast({
        title: 'Copied to clipboard',
        description: 'The enhanced prompt has been copied to your clipboard',
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy text to clipboard',
        variant: 'destructive',
      });
    }
  };

  const downloadFile = (format: 'md' | 'txt' | 'pdf') => {
    let content = enhancedPrompt;
    let type = 'text/plain';
    let extension = 'txt';
    
    if (format === 'md') {
      type = 'text/markdown';
      extension = 'md';
    } else if (format === 'pdf') {
      // For simplicity in this version, we'll just alert the user since PDF generation typically requires libraries
      toast({
        title: 'PDF Download',
        description: 'PDF download would be implemented with a PDF generation library in the full version',
      });
      return;
    }
    
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enhanced-prompt.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Prompt Downloaded',
      description: `Your enhanced prompt has been downloaded as a ${extension.toUpperCase()} file`,
    });
  };

  if (!enhancedPrompt) {
    return null;
  }

  return (
    <motion.div 
      className="space-y-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xl font-semibold gradient-text">Enhanced Prompt</h3>
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={copyToClipboard} 
            className="border-white/10 hover:bg-white/5 group relative"
          >
            {copied ? (
              <Check className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <Copy className="mr-1 h-4 w-4 group-hover:scale-110 transition-transform" />
            )}
            {copied ? 'Copied!' : 'Copy'}
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Copy to clipboard
            </span>
          </Button>
          
          <div className="flex gap-1">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => downloadFile('md')} 
              className="border-white/10 hover:bg-white/5 group relative"
            >
              <FileText className="mr-1 h-4 w-4 group-hover:scale-110 transition-transform" />
              .md
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Download as Markdown
              </span>
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => downloadFile('txt')} 
              className="border-white/10 hover:bg-white/5 group relative"
            >
              <File className="mr-1 h-4 w-4 group-hover:scale-110 transition-transform" />
              .txt
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Download as Text
              </span>
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => downloadFile('pdf')} 
              className="border-white/10 hover:bg-white/5 group relative"
            >
              <FileImage className="mr-1 h-4 w-4 group-hover:scale-110 transition-transform" />
              .pdf
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Download as PDF
              </span>
            </Button>
          </div>
        </div>
      </div>
      
      <Card className="border border-white/10 bg-black/30 p-6 rounded-lg backdrop-blur-lg">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{enhancedPrompt}</ReactMarkdown>
        </div>
      </Card>

      <div className="flex justify-center mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={copyToClipboard} 
          className="border-white/10 hover:bg-white/5"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Full Prompt
        </Button>
      </div>
    </motion.div>
  );
};

export default PromptOutput;
