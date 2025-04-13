
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PromptForm from '@/components/PromptForm';
import PromptOutput from '@/components/PromptOutput';
import Loader from '@/components/Loader';
import SettingsDialog from '@/components/SettingsDialog';
import { enhancePrompt } from '@/services/geminiApi';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  // Default Gemini API key
  const DEFAULT_API_KEY = 'AIzaSyD9-fWSfna9ifENKpaCgwjREpdByxuAO-g';
  
  // State for custom API key
  const [customApiKey, setCustomApiKey] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [useCustomApiKey, setUseCustomApiKey] = useState(false);

  // State for custom instructions
  const [customInstructions, setCustomInstructions] = useState('');
  
  const [rawPrompt, setRawPrompt] = useState('');
  const [promptLength, setPromptLength] = useState('medium');
  const [outputFormat, setOutputFormat] = useState('markdown');
  const [focusArea, setFocusArea] = useState('clarity');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('customApiKey');
    if (savedApiKey) {
      setCustomApiKey(savedApiKey);
      setUseCustomApiKey(true);
    }

    const savedInstructions = localStorage.getItem('customInstructions');
    if (savedInstructions) {
      setCustomInstructions(savedInstructions);
    }
  }, []);

  // Get the current API key to use (default or custom)
  const getApiKey = () => {
    return useCustomApiKey && customApiKey ? customApiKey : DEFAULT_API_KEY;
  };

  const handleSaveSettings = () => {
    setUseCustomApiKey(!!customApiKey);
    
    // Save settings to localStorage
    if (customApiKey) {
      localStorage.setItem('customApiKey', customApiKey);
    } else {
      localStorage.removeItem('customApiKey');
    }
    
    if (customInstructions) {
      localStorage.setItem('customInstructions', customInstructions);
    } else {
      localStorage.removeItem('customInstructions');
    }
  };

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
        apiKey: getApiKey(),
        customInstructions: customInstructions,
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
        description: error instanceof Error ? error.message : 'Failed to enhance prompt. Please check API key and try again.',
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

  return (
    <div className="flex flex-col min-h-screen overflow-hidden cursor-none">
      <CustomCursor />
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />
      
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <Loader size="lg" text="Enhancing your prompt with AI magic..." />
                <p className="mt-6 text-white/70 max-w-md mx-auto">Your enhanced prompt is being crafted with precision and creativity</p>
              </div>
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold gradient-text">Enhanced Result</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleReset}
                  className="border-white/10 hover:bg-white/10"
                >
                  Create New
                </Button>
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
              <span className="gradient-text">Created with ❤️ by </span>
              <a 
                href="https://github.com/akshayp001" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary transition-colors duration-300"
              >
                Akshay Patil
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

      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        apiKey={customApiKey}
        onApiKeyChange={setCustomApiKey}
        customInstructions={customInstructions}
        onCustomInstructionsChange={setCustomInstructions}
        onSave={handleSaveSettings}
      />
    </div>
  );
};

export default Index;
