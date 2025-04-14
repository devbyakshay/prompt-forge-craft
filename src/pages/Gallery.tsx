
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { getLatestPrompts, getPromptsByCategory, Prompt } from '@/services/firestoreService';
import { Copy, Heart, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const Gallery: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      try {
        let fetchedPrompts: Prompt[];
        
        if (category === "all") {
          fetchedPrompts = await getLatestPrompts(20);
        } else {
          fetchedPrompts = await getPromptsByCategory(category, 20);
        }
        
        setPrompts(fetchedPrompts);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [category]);

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied to clipboard",
        description: "The prompt has been copied to your clipboard",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Could not copy prompt to clipboard",
      });
    }
  };

  const filteredPrompts = prompts.filter(prompt => 
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    prompt.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Placeholder prompts if none are loaded yet
  const placeholderPrompts: Prompt[] = [
    {
      id: '1',
      title: 'Website Content Generator',
      content: 'Generate compelling website content for [industry] that highlights [key features] and addresses [pain points]. Use a [tone] tone and include specific calls to action for [target audience].',
      authorId: 'user1',
      authorName: 'Marketing Pro',
      createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
      category: 'Marketing',
      likes: 45,
      isAnonymous: false
    },
    {
      id: '2',
      title: 'Data Analysis Script',
      content: 'Write a Python script that performs [analysis type] on [dataset description]. Include functions for data cleaning, visualization using [library], and statistical analysis to identify [patterns of interest].',
      authorId: 'user2',
      authorName: 'Data Scientist',
      createdAt: { seconds: Date.now() / 1000 - 86400, nanoseconds: 0 } as any, 
      category: 'Programming',
      likes: 32,
      isAnonymous: false
    },
    {
      id: '3',
      title: 'Learning Module Outline',
      content: 'Create a comprehensive learning outline for [subject] aimed at [audience level]. Structure it with clear objectives, key concepts, practical exercises, and assessment criteria. Include multimedia resource suggestions.',
      authorId: null,
      authorName: 'Anonymous',
      createdAt: { seconds: Date.now() / 1000 - 172800, nanoseconds: 0 } as any, 
      category: 'Education',
      likes: 28,
      isAnonymous: true
    },
  ];

  const displayPrompts = filteredPrompts.length > 0 ? filteredPrompts : placeholderPrompts;

  const promptCategories = [
    { id: "all", name: "All Prompts" },
    { id: "general", name: "General" },
    { id: "writing", name: "Writing" },
    { id: "marketing", name: "Marketing" },
    { id: "programming", name: "Programming" },
    { id: "education", name: "Education" },
    { id: "creative", name: "Creative" }
  ];

  return (
    <div className="min-h-screen bg-promgine-bg">
      <Header />
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-pulse animation-delay-150" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl animate-pulse animation-delay-300" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      <main className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Prompt Gallery</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Explore a collection of community-shared prompts engineered for various use cases.
            Find inspiration or use them directly in your projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-col sm:flex-row justify-between gap-4"
        >
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search prompts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/20 border-white/10 focus:border-primary/50 text-white"
            />
          </div>
          
          <Tabs value={category} onValueChange={setCategory} className="w-full sm:w-auto">
            <TabsList className="bg-black/30 p-1 overflow-x-auto flex no-scrollbar">
              {promptCategories.map((cat) => (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id}
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-60 rounded-xl bg-black/20 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              show: { 
                opacity: 1,
                transition: { 
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayPrompts.map((prompt, index) => (
              <motion.div
                key={prompt.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className="group"
              >
                <Card className="h-full flex flex-col border-white/5 bg-black/30 transition-all duration-300 hover:shadow-glow group-hover:border-white/20">
                  <CardContent className="p-6 flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded-full">
                        {prompt.category}
                      </span>
                      <div className="flex items-center gap-1 text-white/60">
                        <Heart className="w-3 h-3" />
                        <span className="text-xs">{prompt.likes}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:gradient-text transition-colors duration-300">
                      {prompt.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-4">
                      {prompt.content}
                    </p>
                  </CardContent>
                  <CardFooter className="px-6 py-3 border-t border-white/5 bg-black/20 flex justify-between">
                    <div className="text-xs text-white/60">
                      By {prompt.authorName}
                    </div>
                    <button
                      onClick={() => copyToClipboard(prompt.content)}
                      className="flex items-center gap-1 text-primary hover:text-primary/80 text-xs"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Gallery;
