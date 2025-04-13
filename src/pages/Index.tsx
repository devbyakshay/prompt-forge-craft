
import React, { useState } from 'react';
import Header from '@/components/Header';
import PromptForm from '@/components/PromptForm';
import PromptOutput from '@/components/PromptOutput';
import Loader from '@/components/Loader';
import SettingsDialog from '@/components/SettingsDialog';
import { enhancePrompt } from '@/services/geminiApi';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Index = () => {
  // Default Gemini API key
  const DEFAULT_API_KEY = 'AIzaSyD9-fWSfna9ifENKpaCgwjREpdByxuAO-g';
  
  // State for custom API key
  const [customApiKey, setCustomApiKey] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [useCustomApiKey, setUseCustomApiKey] = useState(false);
  
  const [rawPrompt, setRawPrompt] = useState('');
  const [promptLength, setPromptLength] = useState('medium');
  const [outputFormat, setOutputFormat] = useState('markdown');
  const [focusArea, setFocusArea] = useState('clarity');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Get the current API key to use (default or custom)
  const getApiKey = () => {
    return useCustomApiKey && customApiKey ? customApiKey : DEFAULT_API_KEY;
  };

  const handleSaveApiKey = () => {
    setUseCustomApiKey(!!customApiKey);
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
    try {
      const result = await enhancePrompt({
        prompt: rawPrompt,
        length: promptLength,
        outputFormat,
        focusArea,
        apiKey: getApiKey(),
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

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
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
            <h1 className="text-4xl md:text-6xl font-bold gradient-text text-shadow">
              Promgine
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Transform your raw prompts into detailed, structured, and powerful instructions for AI models
            </p>
            <div className="divider-gradient w-full max-w-md mx-auto my-8"></div>
          </motion.div>

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

          {isProcessing ? (
            <motion.div 
              className="flex flex-col items-center justify-center py-16 space-y-4"
              variants={fadeInUp}
            >
              <Loader size="lg" text="Enhancing your prompt..." />
            </motion.div>
          ) : enhancedPrompt ? (
            <motion.div 
              className="gradient-border glass-card p-6 rounded-lg hover-translate"
              variants={fadeInUp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PromptOutput enhancedPrompt={enhancedPrompt} />
            </motion.div>
          ) : null}
        </motion.div>
      </main>
      
      <footer className="border-t border-white/10 py-6 px-4 text-center text-white/50 backdrop-blur-sm">
        <p>© 2025 Promgine. All rights reserved.</p>
      </footer>

      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        apiKey={customApiKey}
        onApiKeyChange={setCustomApiKey}
        onSave={handleSaveApiKey}
      />
    </div>
  );
};

export default Index;
