import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { Search, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Timestamp } from 'firebase/firestore';

// Mock data for showcase items (to be replaced with actual data from Firebase)
interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  createdAt: Timestamp;
  category: string;
}

const mockShowcaseItems: ShowcaseItem[] = [
  {
    id: '1',
    title: 'Modern E-commerce Platform',
    description: 'A fully responsive e-commerce platform with advanced filtering and search capabilities.',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80',
    websiteUrl: 'https://example.com/ecommerce',
    createdAt: Timestamp.now(),
    category: 'E-commerce'
  },
  {
    id: '2',
    title: 'AI Content Generator Dashboard',
    description: 'A dashboard for managing AI-generated content with analytics and performance metrics.',
    imageUrl: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    websiteUrl: 'https://example.com/ai-dashboard',
    createdAt: Timestamp.now(),
    category: 'Dashboard'
  },
  {
    id: '3',
    title: 'Portfolio Website Template',
    description: 'A modern, customizable portfolio website template for creative professionals.',
    imageUrl: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    websiteUrl: 'https://example.com/portfolio',
    createdAt: Timestamp.now(),
    category: 'Portfolio'
  }
];

const Showcase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<ShowcaseItem[]>(mockShowcaseItems);
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    const filtered = mockShowcaseItems.filter(item => {
      const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = categoryFilter === 'All' || item.category === categoryFilter;
      return searchMatch && categoryMatch;
    });
    setFilteredItems(filtered);
  }, [searchTerm, categoryFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  const categories = ['All', ...new Set(mockShowcaseItems.map(item => item.category))];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="bg-black/20 backdrop-blur-md py-12 px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text text-shadow mb-4">
            Showcase
          </h1>
          <p className="text-white/70 text-lg mb-8">
            Explore inspiring projects created by the community.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative w-full md:max-w-sm">
              <Input 
                type="text" 
                placeholder="Search projects..." 
                className="rounded-full bg-black/40 border-white/10 text-white shadow-none focus-visible:ring-2 focus-visible:ring-primary"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
            </div>
            
            <div className="flex gap-2 items-center justify-center">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={category === categoryFilter ? "default" : "outline"}
                  className={`rounded-full ${category === categoryFilter ? 'bg-gradient-primary text-white hover:bg-primary' : 'bg-black/30 border-white/10 text-white/70 hover:text-white hover:bg-white/10'}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-6 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="glass-card p-4 rounded-lg flex flex-col h-full"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(74, 144, 226, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-md">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110" 
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/70 flex-grow">{item.description}</p>
              <div className="mt-4">
                <Button
                  asChild
                  variant="secondary"
                  className="w-full rounded-full hover:bg-secondary/80"
                >
                  <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      <footer className="border-t border-white/10 py-6 px-4 text-center backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/50">
            &copy; {new Date().getFullYear()} Promgine. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Showcase;
