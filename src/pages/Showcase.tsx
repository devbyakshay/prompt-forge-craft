
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { getShowcaseItems, ShowcaseItem } from '@/services/firestoreService';
import { Globe, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const Showcase: React.FC = () => {
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const items = await getShowcaseItems();
        setShowcaseItems(items);
      } catch (error) {
        console.error("Error fetching showcase items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowcase();
  }, []);

  // Placeholder showcase items if none are loaded yet
  const placeholderItems: ShowcaseItem[] = [
    {
      id: '1',
      title: 'AI Content Generator',
      description: 'A sophisticated content generation tool built using Promgine\'s specialized prompts for marketing copy.',
      imageUrl: 'https://via.placeholder.com/600x400?text=AI+Content+Generator',
      projectUrl: 'https://example.com/project1',
      authorId: 'user1',
      authorName: 'Tech Innovations',
      createdAt: Timestamp.now(),
      category: 'Marketing'
    },
    {
      id: '2',
      title: 'Intelligent Learning Platform',
      description: 'An adaptive education system that personalizes learning experiences using AI prompts created with Promgine.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Learning+Platform',
      projectUrl: 'https://example.com/project2',
      authorId: 'user2',
      authorName: 'EduTech Solutions',
      createdAt: Timestamp.now(),
      category: 'Education'
    },
    {
      id: '3',
      title: 'Virtual Health Assistant',
      description: 'A healthcare chatbot that provides medical information using carefully engineered prompts from Promgine.',
      imageUrl: 'https://via.placeholder.com/600x400?text=Health+Assistant',
      projectUrl: 'https://example.com/project3',
      authorId: 'user3',
      authorName: 'HealthCare AI',
      createdAt: Timestamp.now(),
      category: 'Healthcare'
    }
  ];

  const displayItems = showcaseItems.length > 0 ? showcaseItems : placeholderItems;

  return (
    <div className="min-h-screen bg-promgine-bg">
      <Header />
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl animate-pulse animation-delay-150" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl animate-pulse animation-delay-300" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      <main className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Showcase</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Discover amazing projects built with Promgine's engineered prompts.
            These showcase examples demonstrate the power of well-crafted AI instructions.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-72 rounded-xl bg-black/20 animate-pulse"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className="group"
              >
                <Card className="overflow-hidden border-white/5 bg-black/30 transition-all duration-300 hover:shadow-glow group-hover:border-white/20">
                  <div className="relative aspect-video overflow-hidden">
                    <motion.img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-sm text-white/90 backdrop-blur-sm bg-black/30 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-colors duration-300">{item.title}</h3>
                    <p className="text-white/70 text-sm line-clamp-3">{item.description}</p>
                  </CardContent>
                  <CardFooter className="px-6 py-4 border-t border-white/5 bg-black/20 flex justify-between">
                    <div className="text-sm text-white/60">
                      By {item.authorName}
                    </div>
                    <a 
                      href={item.projectUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm"
                    >
                      <Globe className="w-4 h-4" /> 
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
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

export default Showcase;
