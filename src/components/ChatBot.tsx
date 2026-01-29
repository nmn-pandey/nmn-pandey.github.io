import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Cached knowledge base - this would be populated from LinkedIn, GitHub, website, and resume
const knowledgeBase = {
  name: 'Naman Pandey',
  title: 'Data Scientist & AI Engineer',
  location: 'London, UK',
  email: 'namanp95@gmail.com',
  phone: '+44 7307 658109',
  summary: `Versatile Software Engineer with 8+ years of cross-industry experience. Proven track record of implementing end-to-end AI solutions, NLP solutions, and computer vision systems across healthcare, finance and industrial sectors, including Neural networks, GenAI models, chatbots, and computer vision solutions. Expert in Python development alongside cloud AI services using GCP, Azure and MLOps.`,

  currentRole: {
    title: 'Data Scientist - R&D',
    company: 'Blatchford Mobility',
    period: 'Apr 2024 - Present',
    description: 'Architecting end-to-end ML pipelines for processing and analysing large multimodal medical sensor datasets. Developing ML models for Gait Phase Identification and abnormal gait detection.'
  },

  skills: [
    'Machine Learning: PyTorch, TensorFlow, Scikit-Learn, Keras, Neural Networks, Time Series Analysis',
    'GenAI: GPT-5, BERT, RAG, Vector DB, LangChain, TensorRT-LLM, vLLM, Llama',
    'NLP: Transformers, SpaCy, NLTK, Tokenisation, Embeddings, Sentiment Analysis',
    'Computer Vision: OpenCV, Image Processing, Medical Imaging, UNET, Encoder Decoder Models',
    'Cloud: GCP, Azure, Vertex AI',
    'MLOps: Docker, Kubernetes, CI/CD, Git, Weights and Biases'
  ],

  education: [
    'M.Sc. Artificial Intelligence - Brunel University London (Distinction)',
    'B.Tech. Computer Science - Birla Institute of Applied Sciences (Merit)'
  ],

  projects: [
    'Brain Tumour Segmentation - 3D MRI analysis with Swin Transformers',
    'Dialogue Insights Generator - GenAI app for conversation analysis',
    'Missing Money Matters - Financial analytics platform'
  ],

  experience: [
    'Data Scientist - R&D at Blatchford Mobility (2024-Present)',
    'Technical Project Manager at Mercor (2025-Present)',
    'Machine Learning Engineer at Mercor (2024)',
    'Research Assistant at Brunel University (2023)',
    'Process Analysis Engineer at Pressco Technology (2017-2022)',
    'Software Developer at TCS (2016-2017)'
  ],

  links: {
    linkedin: 'https://linkedin.com/in/nmn-pandey',
    github: 'https://github.com/nmn-pandey',
    website: 'https://nmn-pandey.github.io'
  }
};

// Simple response generator based on knowledge base
function generateResponse(query: string): string {
  const lowerQuery = query.toLowerCase();

  // Check for various query types
  if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job')) {
    return `Naman has 8+ years of experience across multiple roles:\n\n${knowledgeBase.experience.join('\n')}\n\nCurrently, he's a ${knowledgeBase.currentRole.title} at ${knowledgeBase.currentRole.company} where he's ${knowledgeBase.currentRole.description.toLowerCase()}`;
  }

  if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech')) {
    return `Naman's technical expertise includes:\n\n${knowledgeBase.skills.join('\n')}`;
  }

  if (lowerQuery.includes('project')) {
    return `Naman has worked on several notable projects:\n\n${knowledgeBase.projects.join('\n')}\n\nYou can find more details on his GitHub: ${knowledgeBase.links.github}`;
  }

  if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('study')) {
    return `Naman's educational background:\n\n${knowledgeBase.education.join('\n')}`;
  }

  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach')) {
    return `You can reach Naman at:\nEmail: ${knowledgeBase.email}\nPhone: ${knowledgeBase.phone}\nLinkedIn: ${knowledgeBase.links.linkedin}`;
  }

  if (lowerQuery.includes('current') || lowerQuery.includes('now') || lowerQuery.includes('today')) {
    return `Naman is currently working as a ${knowledgeBase.currentRole.title} at ${knowledgeBase.currentRole.company} since ${knowledgeBase.currentRole.period}.\n\n${knowledgeBase.currentRole.description}`;
  }

  if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
    return `Hello! I'm Naman's AI assistant. I can tell you about his experience, skills, projects, education, or how to contact him. What would you like to know?`;
  }

  if (lowerQuery.includes('about') || lowerQuery.includes('who')) {
    return `${knowledgeBase.summary}\n\nHe's currently based in ${knowledgeBase.location} and eligible to work unrestricted in the UK and India.`;
  }

  // Default response
  return `I can help you learn about Naman's experience, skills, projects, education, or contact information. What would you like to know?\n\nYou can also check out his LinkedIn (${knowledgeBase.links.linkedin}) or GitHub (${knowledgeBase.links.github}) for more details.`;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm Naman's AI assistant. I can tell you about his experience, skills, projects, or how to contact him. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate API delay - in production, this would call the actual LLM API
    setTimeout(() => {
      const response = generateResponse(userMessage.content);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg flex items-center justify-center"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: '0 4px 20px hsl(195 100% 50% / 0.4)'
            }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full h-[100dvh] sm:h-auto sm:w-96 sm:max-w-[calc(100vw-3rem)] glass sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px hsl(195 100% 50% / 0.2)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Ask about Naman</h3>
                  <p className="text-xs text-muted-foreground">AI Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] sm:h-80">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                    ? 'bg-secondary'
                    : 'bg-gradient-to-br from-primary to-accent'
                    }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line ${message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-secondary rounded-bl-md'
                    }`}>
                    {message.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-muted-foreground"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-muted-foreground"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-muted-foreground"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background/50">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Naman's experience, skills..."
                  className="flex-1 px-4 py-2 rounded-full bg-secondary border border-border focus:border-primary focus:outline-none text-sm"
                />
                <Button
                  size="icon"
                  className="rounded-full w-10 h-10"
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by cached knowledge from LinkedIn, GitHub & Resume
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
