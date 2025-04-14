
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Code, PenTool, Github, Linkedin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'framer-motion';

const LandingPage = () => {
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

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
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
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header isLandingPage={true} />
      
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Gradient Blobs */}
        <motion.div 
          animate={pulseAnimation}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl" 
        />
        <motion.div 
          animate={{
            ...pulseAnimation,
            transition: { ...pulseAnimation.transition, delay: 0.5 }
          }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl" 
        />
        <motion.div 
          animate={{
            ...pulseAnimation,
            transition: { ...pulseAnimation.transition, delay: 1 }
          }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl" 
        />
        
        {/* Futuristic grid with animated scanning effect */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10">
          <motion.div 
            className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            animate={{
              y: ['0vh', '100vh'],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "linear"
            }}
          />
        </div>
        
        {/* Floating particles with enhanced animation */}
        {[...Array(30)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute bg-white/20 rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
              y: [0, -20, 0],
              x: [0, Math.random() > 0.5 ? 10 : -10, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Digital circuits with animated pulses */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit-pattern" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="scale(0.5)">
            <path d="M100 0 L100 100 L0 100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"></path>
            <motion.circle 
              cx="100" cy="0" r="2" 
              fill="rgba(74, 144, 226, 0.5)"
              animate={{ r: [2, 4, 2], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <motion.circle 
              cx="0" cy="100" r="2" 
              fill="rgba(74, 144, 226, 0.5)"
              animate={{ r: [2, 4, 2], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 4 }}
            />
            <motion.circle 
              cx="100" cy="100" r="2" 
              fill="rgba(74, 144, 226, 0.5)"
              animate={{ r: [2, 4, 2], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 5 }}
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)"></rect>
        </svg>
        
        {/* Neural network nodes with enhanced connections */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`node-${i}`}
              className="absolute w-2 h-2 bg-primary/50 rounded-full"
              style={{ 
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 3) * 15}%`
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
                boxShadow: [
                  '0 0 0px rgba(74, 144, 226, 0.3)',
                  '0 0 10px rgba(74, 144, 226, 0.6)',
                  '0 0 0px rgba(74, 144, 226, 0.3)'
                ]
              }}
              transition={{
                duration: 2 + i % 3,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
          
          {/* Connection lines between nodes with animated data flow */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {[...Array(5)].map((_, i) => (
              <motion.line 
                key={`line-${i}`}
                x1={`${20 + i * 15}%`} 
                y1={`${30 + (i % 3) * 10}%`} 
                x2={`${50 - i * 5}%`} 
                y2={`${45 + (i % 2) * 10}%`} 
                stroke="rgba(74, 144, 226, 0.3)" 
                strokeDasharray="5,5"
                strokeWidth={1}
                animate={{ 
                  opacity: [0.2, 0.6, 0.2],
                  strokeDashoffset: [0, -20]
                }}
                transition={{ 
                  duration: 3 + i, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </svg>
        </div>
      </div>
      
      {/* Hero Section with enhanced animations */}
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
                whileHover={{ 
                  scale: 1.05, 
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
                className="mx-auto w-20 h-20 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-6"
              >
                <PenTool className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text text-shadow tracking-tight">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Promgine
                </motion.span>
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
                className="bg-gradient-primary hover:shadow-glow-strong transition-all duration-500 transform hover:-translate-y-1 text-lg group relative overflow-hidden"
              >
                <Link to="/tool">
                  <motion.span 
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  Start Engineering 
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Section with enhanced animations */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
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
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 0 30px rgba(74, 144, 226, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
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

          {/* Developer Section with enhanced card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-32 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-semibold gradient-text mb-6">About the Developer</h2>
            <motion.div 
              className="glass-card p-8 rounded-xl relative overflow-hidden"
              whileHover={{ 
                boxShadow: "0 0 40px rgba(74, 144, 226, 0.4)"
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-30"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <motion.div 
                className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-5 flex items-center justify-center shadow-glow relative z-10"
                whileHover={{ scale: 1.05 }}
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
              
              <h3 className="text-xl font-semibold text-white mb-2 relative z-10">Akshay Patil</h3>
              <p className="text-white/70 max-w-lg mx-auto mb-6 relative z-10">
                A passionate full-stack developer with expertise in AI technologies and web development. 
                Akshay specializes in creating intuitive, powerful tools that leverage cutting-edge 
                AI capabilities to solve real-world problems.
              </p>
              
              <div className="flex justify-center space-x-4 relative z-10">
                <motion.a 
                  href="https://github.com/akshayp001" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-black/30 rounded-full hover:bg-gradient-primary transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/akshayp01/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-black/30 rounded-full hover:bg-gradient-primary transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="https://akshaypatil.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-black/30 rounded-full hover:bg-gradient-primary transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <Globe className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Section with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-32 text-center"
          >
            <div className="max-w-2xl mx-auto">
              <motion.h2 
                className="text-3xl font-bold gradient-text mb-4"
                animate={{ 
                  textShadow: [
                    "0 0 7px rgba(74, 144, 226, 0.3)",
                    "0 0 10px rgba(74, 144, 226, 0.5)",
                    "0 0 7px rgba(74, 144, 226, 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Ready to elevate your AI prompts?
              </motion.h2>
              <p className="text-white/70 mb-8">Get started with Promgine today and experience the difference that professional prompt engineering can make.</p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow-strong transition-all duration-500 transform hover:-translate-y-1 text-lg group px-8 py-6 rounded-full relative overflow-hidden"
                >
                  <Link to="/tool" className="flex items-center gap-2">
                    <motion.span 
                      className="absolute inset-0 bg-white/10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.5, opacity: 0.4 }}
                      transition={{ duration: 0.8 }}
                    />
                    <span>Try Promgine Now</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer with animated gradient text */}
      <footer className="border-t border-white/10 py-6 px-4 text-center backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-white/50 inline-block"
            whileHover={{ scale: 1.05 }}
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
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
