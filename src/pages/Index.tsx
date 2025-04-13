
import React, { useState } from 'react';
import Header from '@/components/Header';
import PromptForm from '@/components/PromptForm';
import PromptOutput from '@/components/PromptOutput';
import ApiKeyInput from '@/components/ApiKeyInput';
import Loader from '@/components/Loader';
import { enhancePrompt } from '@/services/geminiApi';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySaved, setIsApiKeySaved] = useState(false);
  const [rawPrompt, setRawPrompt] = useState('');
  const [promptLength, setPromptLength] = useState('medium');
  const [outputFormat, setOutputFormat] = useState('markdown');
  const [focusArea, setFocusArea] = useState('clarity');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSaveApiKey = () => {
    setIsApiKeySaved(true);
  };

  const handleSubmit = async () => {
    if (!apiKey) {
      toast({
        title: 'API Key Required',
        description: 'Please enter your Gemini API key first',
        variant: 'destructive',
      });
      return;
    }

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
        apiKey,
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
        description: error instanceof Error ? error.message : 'Failed to enhance prompt. Please check your API key and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="space-y-8 w-full">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text text-shadow">
              Promgine
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Transform your raw prompts into detailed, structured, and powerful instructions for AI models
            </p>
            <div className="divider-gradient w-full max-w-md mx-auto my-6"></div>
          </div>

          {!isApiKeySaved ? (
            <div className="max-w-2xl mx-auto w-full gradient-border bg-black/20 p-6 rounded-lg">
              <ApiKeyInput 
                apiKey={apiKey} 
                onChange={setApiKey} 
                onSave={handleSaveApiKey} 
              />
            </div>
          ) : (
            <div className="space-y-10 w-full">
              <div className="gradient-border bg-black/20 p-6 rounded-lg">
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
              </div>

              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <Loader size="lg" />
                  <p className="text-white/70 animate-pulse">Enhancing your prompt...</p>
                </div>
              ) : enhancedPrompt ? (
                <div className="gradient-border bg-black/20 p-6 rounded-lg">
                  <PromptOutput enhancedPrompt={enhancedPrompt} />
                </div>
              ) : null}
            </div>
          )}
        </div>
      </main>
      
      <footer className="border-t border-white/10 py-6 px-4 text-center text-white/50">
        <p>© 2025 Promgine. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
