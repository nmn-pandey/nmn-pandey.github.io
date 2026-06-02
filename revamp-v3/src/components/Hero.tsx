import { motion } from "motion/react"
import { ChevronDown } from "lucide-react"
import GlowingButton from "./GlowingButton"

const techBadges = [
  "PyTorch", "TensorFlow", "GPT-5", "BERT", "LangChain", "Docker", "Kubernetes",
]

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="text-center px-4 max-w-3xl">
        <motion.p
          className="text-muted text-sm tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Data Scientist &amp; AI Engineer
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-[#FF3D77] via-[#7DD3FC] to-[#4361EE] bg-clip-text text-transparent">
            Naman Pandey
          </span>
        </motion.h1>

        <motion.p
          className="text-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Versatile Data / AI Professional with Cross-Industry Expertise
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <GlowingButton onClick={() => scrollTo("projects")}>
            View Projects
          </GlowingButton>
          <GlowingButton href="/resume.pdf" variant="outline">
            Download Resume
          </GlowingButton>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {techBadges.map((tech) => (
            <span
              key={tech}
              className="rounded-full px-4 py-2 text-xs bg-[#1A1A1C] border border-white/10 text-muted"
              style={{
                borderImage: "linear-gradient(137deg, #FF3D77, #7DD3FC, #4361EE) 1",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 0.6, delay: 1.2, y: { duration: 1.5, repeat: Infinity } }}
      >
        <ChevronDown className="w-6 h-6 text-muted" />
      </motion.div>
    </section>
  )
}
