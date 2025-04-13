
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Code, PenTool, MousePointer, Github, Linkedin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SettingsDialog from '@/components/SettingsDialog';
import CustomCursor from '@/components/CustomCursor';

const LandingPage = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const stagger = {
    visible: { 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  };
  
  const features = [
    {
      icon: <Sparkles className="w-10 h-10 text-secondary" />,
      title: "Enhanced Prompts",
      description: "Transform simple ideas into detailed, structured prompts optimized for AI models."
    },
    {
      icon: <Zap className="w-10 h-10 text-secondary" />,
      title: "Instant Generation",
      description: "Get results in seconds with the powerful Gemini 2.0 Flash API integration."
    },
    {
      icon: <Code className="w-10 h-10 text-secondary" />,
      title: "Customizable Outputs",
      description: "Choose from various formats and styles to match your specific requirements."
    },
    {
      icon: <PenTool className="w-10 h-10 text-secondary" />,
      title: "Expert Engineering",
      description: "Benefit from advanced prompt engineering techniques built into the system."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-hidden cursor-none">
      <CustomCursor />
      <Header onOpenSettings={() => setIsSettingsOpen(true)} isLandingPage={true} />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl animate-pulse animation-delay-150" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl animate-pulse animation-delay-300" />
        
        {/* Futuristic grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute bg-white/10 rounded-full w-1 h-1"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      {/* Hero Section */}
      <section className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center"
          >
            <motion.div 
              variants={fadeInUp}
              className="space-y-2"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto w-20 h-20 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-6"
              >
                <PenTool className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text text-shadow tracking-tight">
                Promgine
              </h1>
              
              <motion.p 
                variants={fadeInUp} 
                className="text-xl md:text-2xl mt-4 text-white/80 max-w-3xl mx-auto font-light"
              >
                Your personal prompt engineer powered by Gemini AI
              </motion.p>
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-lg text-white/70 max-w-2xl mx-auto"
            >
              Transform your raw prompts into detailed, structured, and powerful instructions for any AI model with just a few clicks.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary hover:shadow-glow-strong transition-all duration-500 transform hover:-translate-y-1 text-lg group"
              >
                <Link to="/tool">
                  Start Engineering 
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 hover:bg-white/10 transition-all duration-300 text-lg"
                onClick={() => setIsSettingsOpen(true)}
              >
                Configure Settings
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } }
            }}
            className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="gradient-border glass-card p-6 rounded-xl hover-translate flex gap-4 group"
              >
                <div className="shrink-0 p-3 rounded-lg bg-black/30 group-hover:bg-gradient-primary transition-all duration-500">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:gradient-text transition-all duration-500">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Developer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-32 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-semibold gradient-text mb-6">About the Developer</h2>
            <div className="glass-card p-8 rounded-xl">
              <motion.div 
                className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-5 flex items-center justify-center shadow-glow"
                animate={{
                  boxShadow: ['0 0 20px rgba(74, 144, 226, 0.3)', '0 0 30px rgba(74, 144, 226, 0.6)', '0 0 20px rgba(74, 144, 226, 0.3)']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <span className="text-white text-2xl font-bold">AP</span>
              </motion.div>
              
              <h3 className="text-xl font-semibold text-white mb-2">Akshay Patil</h3>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                A passionate developer with expertise in AI technologies and web development. 
                Akshay specializes in creating intuitive, powerful tools that leverage cutting-edge 
                AI capabilities to solve real-world problems.
              </p>
              
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://github.com/akshayp001" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-black/30 rounded-full hover:bg-gradient-primary transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/akshayp01/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-black/30 rounded-full hover:bg-gradient-primary transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://akshaypatil.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-black/30 rounded-full hover:bg-gradient-primary transition-all duration-300 hover:scale-110"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-32 text-center"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold gradient-text mb-4">Ready to elevate your AI prompts?</h2>
              <p className="text-white/70 mb-8">Get started with Promgine today and experience the difference that professional prompt engineering can make.</p>
              
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary hover:shadow-glow-strong transition-all duration-500 transform hover:-translate-y-1 text-lg group px-8 py-6 rounded-full"
              >
                <Link to="/tool" className="flex items-center gap-2">
                  <span>Try Promgine Now</span>
                  <MousePointer className="w-5 h-5 animate-bounce" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-6 px-4 text-center backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto">
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
              className="inline-block gradient-text hover:text-white transition-colors duration-300"
            >
              Created with ❤️ by Akshay Patil
            </a>
          </motion.p>
        </div>
      </footer>
      
      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </div>
  );
};

export default LandingPage;
