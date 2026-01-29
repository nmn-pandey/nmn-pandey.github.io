import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, User, Code2, FileText, FolderGit2, Mail,
  Camera, CameraOff, Hand, Keyboard,
  Download, Linkedin, Github, Sparkles,
  ChevronRight, Menu, X, Cpu, Globe, Database, Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import ParticleBackground from './components/ParticleBackground';
import HandGestureController from './components/HandGestureController';
import ChatBot from './components/ChatBot';
import ProjectCard3D from './components/ProjectCard3D';
import './App.css';

// Section types
const sections = ['home', 'about', 'skills', 'resume', 'projects', 'contact'];

// Skills data
const skillsData = [
  { name: 'Python / R / C++', level: 95 },
  { name: 'Machine Learning & AI', level: 95 },
  { name: 'GenAI & LLMs', level: 90 },
  { name: 'NLP & Computer Vision', level: 90 },
  { name: 'Cloud & MLOps', level: 85 },
  { name: 'Statistical Analysis', level: 90 },
  { name: 'Data Visualization', level: 88 },
  { name: 'Software Engineering', level: 85 },
  // { name: 'Deep Learning', level: 92 },
  // { name: 'Computer Vision', level: 85 },
  // { name: 'Big Data (Spark/Hadoop)', level: 82 },
  // { name: 'ML System Design', level: 88 },
];

const technologies = [
  'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Keras', 'GPT-5', 'BERT', 'RAG',
  'LangChain', 'TensorRT-LLM', 'vLLM', 'Llama', 'Transformers', 'SpaCy',
  'OpenCV', 'UNET', 'Docker', 'Kubernetes', 'Azure', 'GCP', 'Vertex AI',
  'PostgreSQL', 'MongoDB', 'Vector DB', 'FastAPI', 'Flask', 'React.js',
  'Pandas', 'NumPy', 'SciPy', 'Tableau', 'Power BI', 'Weights & Biases'
];

// Projects data
const projectsData = [
  {
    title: 'Brain Tumour Segmentation',
    description: '3D MRI segmentation using Swin-Transformers. Achieved 0.795 Dice score in BraTS 2023 benchmarks.',
    tech: ['Medical AI', 'Deep Learning', 'PyTorch', 'Swin Transformers', '3D CNN', 'MRI Analysis'],
    github: 'https://github.com/nmn-pandey/brain-tumour-segmentation',
    image: 'brain-mri',
    color: '#00d4ff',
    icon: <Cpu className="w-12 h-12" />
  },
  {
    title: 'Dialogue Insights Generator',
    description: 'Web app leveraging GPT-3.5 and WhisperX for conversational analysis and psychological profiling.',
    tech: ['NLP', 'Generative AI', 'GPT-3.5', 'WhisperX', 'React', 'FastAPI', 'Python'],
    github: 'https://github.com/nmn-pandey/dialogue-analyser',
    image: 'dialogue',
    color: '#a855f7',
    icon: <Globe className="w-12 h-12" />
  },
  {
    title: 'Fortune 1000 Analytics',
    description: 'Interactive Tableau dashboard analyzing CEO diversity and business growth trends (2019-2021).',
    tech: ['Data Strategy', 'Data Visualization', 'Tableau', 'SQL', 'Python', 'ETL Pipelines'],
    github: 'https://public.tableau.com/app/profile/naman.pandey/viz/Fortune1000Analysis_17064900121200/FinalDashboardClust-Interact2',
    image: 'analytics',
    color: '#00d4ff',
    icon: <Database className="w-12 h-12" />
  },
  {
    title: 'Student Dropout Prediction',
    description: 'ML models predicting academic success using demographic and academic data. Achieved 76% accuracy.',
    tech: ['Predictive Analytics', 'Scikit-Learn', 'Classification', 'Feature Engineering', 'XGBoost', 'Pandas'],
    github: 'https://github.com/nmn-pandey/student-dropout-prediction',
    image: 'dropout',
    color: '#a855f7',
    icon: <Code2 className="w-12 h-12" />
  },
  {
    title: 'Missing Money Matters',
    description: 'Investigating financial discrepancies using SQLite and MongoDB for WSDA Music records.',
    tech: ['SQL', 'NoSQL Analysis', 'SQLite', 'MongoDB', 'Data Auditing', 'Financial Analytics'],
    github: 'https://github.com/nmn-pandey/Missing-Money-Matters',
    image: 'finance',
    color: '#00d4ff',
    icon: <Briefcase className="w-12 h-12" />
  }
];

// Experience data
const experienceData = [
  {
    title: 'Data Scientist - R&D',
    company: 'Blatchford Mobility',
    period: 'Apr 2024 - Present',
    description: 'Architected end-to-end ML pipelines for processing and analysing large multimodal medical sensor datasets. Developed ML models for Gait Phase Identification and abnormal gait detection. Implemented MLOps practices in Azure and governance protocols for sensitive healthcare data.',
    location: 'United Kingdom'
  },
  {
    title: 'Technical Project Manager',
    company: 'Mercor',
    period: 'Aug 2025 - Present',
    description: 'Leading AI evaluation and rubric grading projects for top AI labs, managing cross-functional teams and deliverables. Designing and implementing evaluation frameworks for LLMs and multimodal systems.',
    location: 'United States (Remote)'
  },
  {
    title: 'Machine Learning Engineer',
    company: 'Mercor',
    period: 'Apr 2024 - Aug 2024',
    description: 'Engineered scalable ML pipelines for open-source LLM deployment using TensorRT-LLM and vLLM. Developed C++ and Python benchmarking scripts for performance validation of large-scale models. Implemented CI/CD pipelines with automated testing.',
    location: 'United States (Remote)'
  },
  {
    title: 'Research Assistant',
    company: 'Brunel University',
    period: 'Jul 2023 - Aug 2023',
    description: 'Developed and deployed production-ready conversational AI chatbots using Python, LangChain and GPT-3 APIs. Led research on LLM applications in academic contexts, focusing on NLP and user interaction.',
    location: 'London, UK'
  },
  {
    title: 'Process Analysis Engineer',
    company: 'Pressco Technology Inc.',
    period: 'May 2017 - Aug 2022',
    description: 'Led cross-functional teams in implementing machine vision solutions for 50+ projects across F&B and pharma sectors. Developed production-grade automated quality control systems using computer vision algorithms.',
    location: 'United States'
  },
  {
    title: 'Software Developer',
    company: 'Tata Consultancy Services Ltd.',
    period: 'Jul 2016 - May 2017',
    description: 'Engineered REST APIs for data integration between legacy and modern systems for Finance and Insurance clients. Implemented automated data validation pipelines reducing manual effort by 50%.',
    location: 'India'
  }
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isHandTracking, setIsHandTracking] = useState(false);
  const [handPosition, setHandPosition] = useState({ x: 0.5, y: 0.5 });
  const [typingText, setTypingText] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const fullText = 'Data Scientist & AI Engineer';

  // Header height for scroll offset
  const HEADER_HEIGHT = 10;

  const scrollToSection = useCallback((section: string) => {
    const element = sectionRefs.current[section];
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - HEADER_HEIGHT;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSection(section);
    }
  }, []);

  // Typing animation
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.slice(0, index));
        index++;
      } else {
        setTimeout(() => {
          index = 0;
          setTypingText('');
        }, 2000);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = sectionRefs.current[section];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = sections.indexOf(activeSection);

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        scrollToSection(sections[nextIndex]);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        scrollToSection(sections[prevIndex]);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection('home');
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection('contact');
      } else if (e.key === 'h' || e.key === 'H') {
        toggleHandTracking();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, scrollToSection]);

  const toggleHandTracking = () => {
    setIsHandTracking(prev => {
      const newState = !prev;
      toast.info(newState ? 'Hand tracking enabled. Show your hand to control!' : 'Hand tracking disabled');
      return newState;
    });
  };

  const handleHandGesture = (gesture: string, position: { x: number, y: number }) => {
    setHandPosition(position);

    // Navigate based on hand position
    if (gesture === 'point') {
      const sectionIndex = Math.floor(position.y * sections.length);
      const clampedIndex = Math.max(0, Math.min(sectionIndex, sections.length - 1));
      const targetSection = sections[clampedIndex];

      if (targetSection !== activeSection) {
        scrollToSection(targetSection);
      }
    }
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: Code2, label: 'Skills' },
    { id: 'resume', icon: FileText, label: 'Resume' },
    { id: 'projects', icon: FolderGit2, label: 'Projects' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* 3D Particle Background */}
      <ParticleBackground />

      {/* Hand Gesture Controller */}
      <AnimatePresence>
        {isHandTracking && (
          <HandGestureController
            onGesture={handleHandGesture}
            isActive={isHandTracking}
          />
        )}
      </AnimatePresence>

      {/* ChatBot */}
      <ChatBot />

      {/* Hand Position Indicator */}
      {isHandTracking && (
        <motion.div
          className="fixed w-8 h-8 rounded-full border-2 border-primary z-50 pointer-events-none"
          style={{
            left: `${handPosition.x * 100}%`,
            top: `${handPosition.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 20px hsl(195 100% 50%)'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      )}

      {/* Navigation Sidebar - Desktop */}
      <motion.aside
        className="fixed left-0 top-0 h-full w-20 lg:w-64 glass z-40 hidden md:flex flex-col"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile */}
        <div className="p-6 text-center">
          <motion.div
            className="w-16 h-16 lg:w-24 lg:h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl lg:text-4xl font-bold mb-4"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                '0 0 20px hsl(195 100% 50% / 0.3)',
                '0 0 40px hsl(195 100% 50% / 0.5)',
                '0 0 20px hsl(195 100% 50% / 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            NP
          </motion.div>
          <h2 className="hidden lg:block text-lg font-semibold">Naman Pandey</h2>
          <p className="hidden lg:block text-xs text-muted-foreground">AI / Data Professional</p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${activeSection === item.id
                ? 'bg-primary/20 text-primary nav-active'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-5 h-5" />
              <span className="hidden lg:block">{item.label}</span>
              {activeSection === item.id && (
                <motion.div
                  className="absolute right-4 w-2 h-2 rounded-full bg-primary"
                  layoutId="nav-indicator"
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Social Links */}
        <div className="p-4 flex justify-center gap-3">
          <a href="https://linkedin.com/in/nmn-pandey" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/20">
              <Linkedin className="w-5 h-5" />
            </Button>
          </a>
          <a href="https://github.com/nmn-pandey" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/20">
              <Github className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </motion.aside>

      {/* Mobile Navigation */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 glass">
        <div className="flex items-center justify-between p-4">
          <span className="font-bold text-lg">Naman Pandey</span>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-6 py-3 ${activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Control Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="fixed top-4 right-4 z-50 glass rounded-xl p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Interactive Controls</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-auto"
                onClick={() => setShowControls(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={isHandTracking ? 'default' : 'outline'}
                size="sm"
                onClick={toggleHandTracking}
                className="flex items-center gap-2"
              >
                {isHandTracking ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                <span className="hidden sm:inline">Hand (H)</span>
              </Button>
            </div>
            <div className="mt-3 text-xs text-muted-foreground space-y-1">
              <p><Keyboard className="w-3 h-3 inline mr-1" /> Arrow keys to navigate</p>
              <p><Hand className="w-3 h-3 inline mr-1" /> Enable hand tracking</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show controls button when hidden */}
      {!showControls && (
        <motion.button
          className="fixed top-4 right-4 z-50 glass rounded-full p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowControls(true)}
          whileHover={{ scale: 1.1 }}
        >
          <Sparkles className="w-5 h-5 text-primary" />
        </motion.button>
      )}

      {/* Main Content */}
      <main className="relative z-10 md:ml-20 lg:ml-64 pt-20 md:pt-0">
        {/* Hero Section */}
        <section
          ref={(el) => { sectionRefs.current['home'] = el; }}
          id="home"
          className="min-h-screen flex items-center justify-center relative px-4 md:px-12"
        >
          <div className="text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-primary/50">
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                Welcome to my interactive portfolio
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Naman <span className="gradient-text">Pandey</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Versatile Data / AI Professional with Cross-Industry Expertise
            </motion.p>

            <motion.div
              className="text-lg md:text-xl text-primary mb-8 typing-cursor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              I'm a <span className="font-semibold">{typingText}</span>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                size="lg"
                className="gap-2 glow-cyan"
                onClick={() => scrollToSection('projects')}
              >
                View Projects <ChevronRight className="w-4 h-4" />
              </Button>
              <a href="./resume.pdf" download>
                <Button size="lg" variant="outline" className="gap-2">
                  <Download className="w-4 h-4" /> Download Resume
                </Button>
              </a>
            </motion.div>

            {/* Interactive hint */}
            <motion.div
              className="mt-12 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p className="flex items-center justify-center gap-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <Hand className="w-4 h-4" /> Enable hand tracking
                </span>
                <span className="flex items-center gap-1">
                  <Keyboard className="w-4 h-4" /> Use arrow keys
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> Ask the chatbot
                </span>
              </p>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section
          ref={(el) => { sectionRefs.current['about'] = el; }}
          id="about"
          className="py-20 px-4 md:px-12 relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-primary/50">About Me</Badge>
                <h2 className="text-4xl md:text-5xl font-bold">Who I Am</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="glass rounded-2xl p-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-8xl font-bold gradient-text">NP</div>
                  </div>
                </motion.div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold gradient-text">
                    Data Scientist & AI Engineer
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Versatile Software Engineer with 9+ years of cross-industry experience. Proven track record
                    of implementing end-to-end AI solutions, NLP solutions, and computer vision systems across
                    healthcare, finance and industrial sectors, including Neural networks, GenAI models, chatbots,
                    and computer vision solutions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Expert in Python development alongside cloud AI services using GCP, Azure and MLOps.
                    Strong background in handling large-scale data, managing cross-functional teams and driving
                    technical decisions across multiple projects. Currently building healthcare-focused ML pipelines
                    at Blatchford Mobility. Eligible to work unrestricted in the UK and India.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                      { label: 'Birthday', value: '14 Oct 1995' },
                      { label: 'Location', value: 'London, UK' },
                      { label: 'Degree', value: 'MSc in AI' },
                      { label: 'Email', value: 'namanp95@gmail.com' },
                      { label: 'Phone', value: '+44 7307658109' },
                      { label: 'Freelance', value: 'Available' },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </section>


        {/* Skills Section */}
        <section
          ref={(el) => { sectionRefs.current['skills'] = el; }}
          id="skills"
          className="py-12 px-4 md:px-12 relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <Badge variant="outline" className="mb-4 border-primary/50">My Skills</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Expertise</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  From programming languages to AI and data analysis tools, I bring a diverse skill set
                  honed through academic study and hands-on experience.
                </p>
              </div>

              {/* Skills Progress Bars */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {skillsData.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="glass rounded-xl p-6"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-3">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Technologies */}
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6 text-center">Technologies</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Badge
                        variant="secondary"
                        className="px-4 py-2 text-sm hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Resume Section */}
        <section
          ref={(el) => { sectionRefs.current['resume'] = el; }}
          id="resume"
          className="py-20 px-4 md:px-12 relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-primary/50">Resume</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">My Experience</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Versatile Software Engineer with 9+ years of cross-industry experience. Proven track record
                  of implementing end-to-end AI solutions, NLP solutions, and computer vision systems across
                  healthcare, finance and industrial sectors.
                </p>
              </div>

              {/* Experience Timeline */}
              <div className="space-y-8 mb-16">
                {experienceData.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    className="glass rounded-2xl p-8 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent" />
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        <p className="text-primary">{exp.company}</p>
                      </div>
                      <Badge variant="outline" className="mt-2 md:mt-0 w-fit">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{exp.description}</p>
                    <p className="text-sm text-muted-foreground">{exp.location}</p>
                  </motion.div>
                ))}
              </div>

              {/* Education */}
              <div className="glass rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-semibold mb-6">Education</h3>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="font-semibold">Master of Science (M.Sc.), Artificial Intelligence</h4>
                        <p className="text-primary">Brunel University, London</p>
                      </div>
                      <Badge variant="outline" className="mt-2 md:mt-0 w-fit">2022 - 2023</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">Grade: <b>Distinction</b></p>
                  </div>

                  <div className="border-t border-border pt-8 space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="font-semibold">Bachelor of Technology (B.Tech.), Computer Science</h4>
                        <p className="text-primary">Birla Institute of Applied Sciences, India</p>
                      </div>
                      <Badge variant="outline" className="mt-2 md:mt-0 w-fit">2012 - 2016</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">Grade: <b>Merit</b></p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-6">Certifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Six Sigma Green Belt - LinkedIn Learning',
                    'Google Cloud Computing Foundations - Google',
                    'Data Analytics Essentials - Cisco',
                    'Career Essentials in Generative AI - Microsoft'
                  ].map((cert) => (
                    <div key={cert} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section
          ref={(el) => { sectionRefs.current['projects'] = el; }}
          id="projects"
          className="py-20 px-4 md:px-12 relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-primary/50">Projects</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Work</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Here are some of my notable projects that showcase my technical skills and expertise
                  in AI, data science, and software development.
                </p>
              </div>

              {/* Centered Project Cards */}
              <div className="flex flex-wrap justify-center gap-8">
                {projectsData.map((project, index) => (
                  <div key={project.title} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] max-w-md">
                    <ProjectCard3D
                      project={project}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section
          ref={(el) => { sectionRefs.current['contact'] = el; }}
          id="contact"
          className="py-20 px-4 md:px-12 relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-primary/50">Contact</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
                <p className="text-muted-foreground">
                  Feel free to reach out! I'd love to hear from you.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-16 items-start">
                {/* Left Side: Call to Action */}
                <div className="space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-5xl md:text-6xl font-bold leading-tight">
                      Let's Define <br />
                      <span className="gradient-text">the Future.</span>
                    </h3>
                    <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
                      Available for strategic AI consulting, technical leadership,
                      and research collaborations.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <a
                      href="mailto:namanp95@gmail.com"
                      className="block text-2xl md:text-3xl font-semibold hover:text-primary transition-colors"
                    >
                      namanp95@gmail.com
                    </a>

                    <div className="flex flex-wrap gap-10 text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground/60">
                      <a href="https://linkedin.com/in/nmn-pandey" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        LinkedIn
                      </a>
                      <a href="https://github.com/nmn-pandey" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        GitHub
                      </a>
                      <a href="https://medium.com/@nmn.pandey" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        Medium
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="glass rounded-3xl p-8 md:p-10">
                  <form
                    className="space-y-8"
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast.success('Message sent successfully!');
                    }}
                  >
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Your Name</label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-border/50 py-4 focus:border-primary focus:outline-none transition-colors text-xl font-medium"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Your Email</label>
                      <input
                        type="email"
                        className="w-full bg-transparent border-b border-border/50 py-4 focus:border-primary focus:outline-none transition-colors text-xl font-medium"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Message</label>
                      <textarea
                        rows={1}
                        className="w-full bg-transparent border-b border-border/50 py-4 focus:border-primary focus:outline-none transition-colors text-xl font-medium resize-none overflow-hidden"
                        placeholder="Tell me about your project"
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = 'auto';
                          target.style.height = target.scrollHeight + 'px';
                        }}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full py-8 text-sm font-bold uppercase tracking-[0.2em] bg-white text-black hover:bg-white/90 transition-all rounded-xl">
                      Send Inquiry
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 md:px-12 text-center text-muted-foreground text-sm">
          <p>© 2026 Naman Pandey. Built with React, Three.js & Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
