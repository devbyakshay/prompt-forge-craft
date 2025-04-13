
import React from 'react';
import { Button } from './ui/button';
import { Download, Copy, FileText, FileImage, File } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import { Card } from './ui/card';

interface PromptOutputProps {
  enhancedPrompt: string;
}

const PromptOutput: React.FC<PromptOutputProps> = ({ enhancedPrompt }) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(enhancedPrompt);
      toast({
        title: 'Copied to clipboard',
        description: 'The enhanced prompt has been copied to your clipboard',
      });
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
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold gradient-text">Enhanced Prompt</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={copyToClipboard} className="border-white/10 hover:bg-white/5">
            <Copy className="mr-1 h-4 w-4" />
            Copy
          </Button>
          <Button size="sm" variant="outline" onClick={() => downloadFile('md')} className="border-white/10 hover:bg-white/5">
            <FileText className="mr-1 h-4 w-4" />
            .md
          </Button>
          <Button size="sm" variant="outline" onClick={() => downloadFile('txt')} className="border-white/10 hover:bg-white/5">
            <File className="mr-1 h-4 w-4" />
            .txt
          </Button>
          <Button size="sm" variant="outline" onClick={() => downloadFile('pdf')} className="border-white/10 hover:bg-white/5">
            <FileImage className="mr-1 h-4 w-4" />
            .pdf
          </Button>
        </div>
      </div>
      
      <Card className="border border-white/10 bg-black/30 p-6 rounded-lg">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{enhancedPrompt}</ReactMarkdown>
        </div>
      </Card>
    </div>
  );
};

export default PromptOutput;
