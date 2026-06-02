import { motion } from 'motion/react'
import { ArrowDown, Download } from 'lucide-react'
import { useTypewriter } from '../hooks/useTypewriter'

export default function HeroContent() {
  const { displayed, done } = useTypewriter("Data Scientist &\nAI Engineer", 45, 400)

  return (
    <section id="work" className="lg:min-h-screen flex items-center py-24 lg:py-0">
      <div className="w-full max-w-xl">
        <motion.p
          className="text-xs uppercase tracking-[0.2em] text-[#738273] mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Naman Pandey
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-[#1C2E1E] leading-[1.08] mb-6 select-none whitespace-pre-wrap">
            {displayed}
            {!done && (
              <span className="inline-block w-[2px] h-[1.1em] bg-[#1C2E1E] align-middle ml-[2px] animate-blink" />
            )}
          </h1>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-6 max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Building intelligent AI systems that solve real-world problems across healthcare, finance, and industry.
        </motion.p>

        <motion.p
          className="text-sm text-[#738273] mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          9+ Years Experience &middot; 50+ Projects &middot; UK & India
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-[#1C2E1E] text-white text-sm px-6 py-3 rounded-full hover:bg-[#2a4530] transition-colors"
          >
            View Projects <ArrowDown size={14} />
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 border border-[#F1F3F1] text-[#1C2E1E] text-sm px-6 py-3 rounded-full hover:bg-[#FAFBF9] transition-colors"
          >
            <Download size={14} /> Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-[#F1F3F1] text-[#5A635A] text-sm px-6 py-3 rounded-full hover:bg-[#FAFBF9] hover:text-[#1C2E1E] transition-colors"
          >
            Get in touch &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  )
}
