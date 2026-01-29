import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  image: string;
  color: string;
  icon?: React.ReactNode;
}

interface ProjectCard3DProps {
  project: Project;
  index: number;
}

export default function ProjectCard3D({ project, index }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation (max 15 degrees)
    const rotateY = (mouseX / (rect.width / 2)) * 15;
    const rotateX = -(mouseY / (rect.height / 2)) * 15;

    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Generate gradient based on project color
  const getGradient = () => {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    const rgb = hexToRgb(project.color);
    return `radial-gradient(circle at 50% 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3) 0%, transparent 70%)`;
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="glass rounded-2xl overflow-hidden relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transition: isHovered ? 'none' : 'transform 0.5s ease-out',
          background: getGradient()
        }}
        whileHover={{
          boxShadow: `0 25px 50px -12px ${project.color}40`,
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            background: `radial-gradient(circle at ${50 + transform.rotateY * 2}% ${50 - transform.rotateX * 2}%, ${project.color}30 0%, transparent 60%)`
          }}
        />

        {/* Card Header with Icon */}
        <div
          className="h-40 flex items-center justify-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}05 100%)`
          }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: project.color }}
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                initial={{
                  left: `${20 + i * 15}%`,
                  top: `${50 + (i % 2) * 20}%`
                }}
              />
            ))}
          </div>

          <motion.div
            className="text-6xl font-bold relative z-10"
            style={{
              color: project.color,
              textShadow: `0 0 30px ${project.color}80`
            }}
            animate={isHovered ? {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            {project.icon || <Sparkles className="w-16 h-16" />}
          </motion.div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Card Content */}
        <div className="p-6 relative flex flex-col h-[280px]" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6 min-h-[60px] content-start">
            {project.tech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs h-fit"
                style={{
                  backgroundColor: `${project.color}20`,
                  color: project.color,
                  borderColor: `${project.color}40`
                }}
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-auto">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 hover:bg-primary/10"
                style={{
                  borderColor: `${project.color}40`
                }}
              >
                <Github className="w-4 h-4" /> View Code
              </Button>
            </a>
          </div>
        </div>

        {/* Border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? `inset 0 0 20px ${project.color}30, 0 0 30px ${project.color}20`
              : 'inset 0 0 0px transparent, 0 0 0px transparent'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Reflection */}
      <motion.div
        className="absolute -bottom-4 left-4 right-4 h-8 rounded-full blur-xl opacity-30"
        style={{ backgroundColor: project.color }}
        animate={{
          opacity: isHovered ? 0.5 : 0.2,
          scale: isHovered ? 1.1 : 1
        }}
      />
    </motion.div>
  );
}
