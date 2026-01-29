import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: "Hi! I'm Naman's AI assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Placeholder for LLM API
        // In a real scenario, you would fetch from Grok/Mistral/OpenAI
        // and provide the cached context (LinkedIn, GitHub, Resume)
        setTimeout(() => {
            const botResponse = {
                role: 'bot',
                content: `Thanks for asking! I'm currently a placeholder. In the full version, I'll answer questions about Naman's experience in AI, his projects like Brain Tumor Segmentation, and his work at Blatchford Mobility. (Input: "${input}")`
            };
            setMessages(prev => [...prev, botResponse]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <>
            <div className="chatbot-trigger" onClick={() => setIsOpen(true)}>
                <MessageSquare color="white" />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="chatbot-window"
                    >
                        <div style={{
                            padding: '1rem',
                            background: 'var(--secondary)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Bot size={20} />
                                <span style={{ fontWeight: 'bold' }}>Naman AI</span>
                            </div>
                            <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
                        </div>

                        <div
                            ref={scrollRef}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}
                        >
                            {messages.map((msg, i) => (
                                <div key={i} style={{
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    padding: '0.8rem',
                                    borderRadius: '12px',
                                    background: msg.role === 'user' ? 'var(--primary)' : 'var(--glass)',
                                    color: msg.role === 'user' ? 'black' : 'white',
                                    fontSize: '0.9rem'
                                }}>
                                    {msg.content}
                                </div>
                            ))}
                            {isLoading && <div style={{ opacity: 0.5, fontSize: '0.8rem' }}>AI is thinking...</div>}
                        </div>

                        <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                style={{
                                    flex: 1,
                                    background: 'var(--glass)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.5rem 1rem',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                            <button
                                onClick={handleSend}
                                style={{
                                    background: 'var(--primary)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <Send size={18} color="black" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
