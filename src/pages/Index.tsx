
import React, { useState } from 'react';
import Header from '@/components/Header';
import PromptForm from '@/components/PromptForm';
import PromptOutput from '@/components/PromptOutput';
import Loader from '@/components/Loader';
import { enhancePrompt } from '@/services/geminiApi';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Copy, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  // Default Gemini API key
  const DEFAULT_API_KEY = 'AIzaSyD9-fWSfna9ifENKpaCgwjREpdByxuAO-g';
  
  const [rawPrompt, setRawPrompt] = useState('');
  const [promptLength, setPromptLength] = useState('medium');
  const [outputFormat, setOutputFormat] = useState('markdown');
  const [focusArea, setFocusArea] = useState('clarity');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!rawPrompt.trim()) {
      toast({
        title: 'Prompt Required',
        description: 'Please enter a prompt to enhance',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    try {
      const result = await enhancePrompt({
        prompt: rawPrompt,
        length: promptLength,
        outputFormat,
        focusArea,
        apiKey: DEFAULT_API_KEY,
        customInstructions: '',
      });
      setEnhancedPrompt(result);
      toast({
        title: 'Prompt Enhanced',
        description: 'Your prompt has been successfully enhanced!',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to enhance prompt. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Reset the output and form
  const handleReset = () => {
    setEnhancedPrompt('');
    setRawPrompt('');
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(enhancedPrompt);
    toast({
      title: 'Copied!',
      description: 'Enhanced prompt copied to clipboard',
    });
  };
  
  const downloadPrompt = () => {
    const element = document.createElement("a");
    const file = new Blob([enhancedPrompt], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "enhanced-prompt.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: 'Downloaded',
      description: 'Enhanced prompt downloaded successfully',
    });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      
      <main className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <motion.div 
          className="space-y-8 w-full"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.div 
            className="text-center space-y-6" 
            variants={fadeInUp}
          >
            <Link to="/" className="inline-block mb-4">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold gradient-text text-shadow">
              Prompt Engineer
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Transform your raw prompts into detailed, structured, and powerful instructions for AI models
            </p>
            <div className="divider-gradient w-full max-w-md mx-auto my-8"></div>
          </motion.div>

          {isProcessing && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="glass-card p-10 rounded-xl max-w-md w-full mx-auto text-center space-y-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <Loader size="lg" text="Enhancing your prompt with AI magic..." />
                <p className="mt-6 text-white/70 max-w-md mx-auto">Your enhanced prompt is being crafted with precision and creativity</p>
                
                <div className="pt-4">
                  <motion.div 
                    className="h-1.5 bg-black/20 rounded-full overflow-hidden"
                    initial={{ width: "100%" }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          <motion.div 
            className="gradient-border glass-card p-6 rounded-lg hover-translate"
            variants={fadeInUp}
          >
            <PromptForm
              rawPrompt={rawPrompt}
              setRawPrompt={setRawPrompt}
              promptLength={promptLength}
              setPromptLength={setPromptLength}
              outputFormat={outputFormat}
              setOutputFormat={setOutputFormat}
              focusArea={focusArea}
              setFocusArea={setFocusArea}
              isProcessing={isProcessing}
              onSubmit={handleSubmit}
            />
          </motion.div>

          {enhancedPrompt ? (
            <motion.div 
              className="gradient-border glass-card p-6 rounded-lg hover-translate"
              variants={fadeInUp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold gradient-text">Enhanced Result</h2>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={copyToClipboard}
                    className="border-white/10 hover:bg-white/10 flex items-center"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={downloadPrompt}
                    className="border-white/10 hover:bg-white/10 flex items-center"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleReset}
                    className="border-white/10 hover:bg-white/10"
                  >
                    Create New
                  </Button>
                </div>
              </div>
              <PromptOutput enhancedPrompt={enhancedPrompt} />
            </motion.div>
          ) : null}
        </motion.div>
      </main>
      
      <footer className="border-t border-white/10 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-4 md:mb-0"
          >
            <motion.p 
              className="text-white/50"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                repeatType: "reverse"
              }}
            >
              <a 
                href="https://github.com/akshayp001" 
                target="_blank" 
                rel="noopener noreferrer"
                className="gradient-text hover:text-secondary transition-colors duration-300"
              >
                Created with ❤️ by Akshay Patil
              </a>
            </motion.p>
          </motion.div>
          <div className="flex space-x-4">
            <a 
              href="https://github.com/akshayp001" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors duration-300"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/akshayp01/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a 
              href="https://akshaypatil.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors duration-300"
            >
              Portfolio
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
