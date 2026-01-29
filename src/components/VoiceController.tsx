import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2 } from 'lucide-react';

interface VoiceControllerProps {
  onCommand: (command: string) => void;
  isActive: boolean;
}

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export default function VoiceController({ onCommand, isActive }: VoiceControllerProps) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      console.error('Speech recognition error:', err);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.stop();
      setIsListening(false);
    } catch (err) {
      console.error('Speech recognition stop error:', err);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      // Simulate volume level based on speech detection
      setVolumeLevel(Math.random() * 0.5 + 0.5);
      setTimeout(() => setVolumeLevel(0), 100);

      const currentTranscript = finalTranscript || interimTranscript;
      setTranscript(currentTranscript);

      if (finalTranscript) {
        onCommand(finalTranscript.trim());
        setTranscript('');
      }
    };

    recognition.onerror = (event: Event) => {
      console.error('Speech recognition error:', event);
      setIsListening(false);
      // Restart on error if still active
      if (isActive) {
        setTimeout(startListening, 1000);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      // Restart if still active
      if (isActive) {
        setTimeout(startListening, 500);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [onCommand, isActive, startListening]);

  useEffect(() => {
    if (isActive) {
      startListening();
    } else {
      stopListening();
      setTranscript('');
    }
  }, [isActive, startListening, stopListening]);

  if (!isActive) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div 
        className="glass rounded-xl p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
            animate={isListening ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Mic className="w-5 h-5 text-primary" />
          </motion.div>
          <div>
            <p className="text-sm font-medium">Voice Control</p>
            <p className="text-xs text-muted-foreground">
              {isListening ? 'Listening...' : 'Starting...'}
            </p>
          </div>
        </div>

        {/* Voice wave visualization */}
        <div className="flex items-center justify-center gap-1 h-8 mb-3">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-primary rounded-full"
              animate={{
                height: isListening ? [4, 8 + volumeLevel * 20 + Math.random() * 10, 4] : 4,
                opacity: isListening ? 0.5 + volumeLevel * 0.5 : 0.3
              }}
              transition={{
                duration: 0.3 + Math.random() * 0.2,
                repeat: Infinity,
                delay: i * 0.05
              }}
              style={{ height: 4 }}
            />
          ))}
        </div>

        {/* Transcript display */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-center text-primary bg-primary/10 rounded-lg px-3 py-2"
            >
              "{transcript}"
            </motion.div>
          )}
        </AnimatePresence>

        {/* Command hints */}
        <div className="mt-3 text-xs text-muted-foreground space-y-1">
          <p className="flex items-center gap-1">
            <Volume2 className="w-3 h-3" />
            Try saying:
          </p>
          <ul className="pl-4 space-y-0.5">
            <li>"Go to home"</li>
            <li>"Show projects"</li>
            <li>"Open contact"</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
