import { motion } from "motion/react"
import GlowingCard from "./GlowingCard"
import SectionHeader from "./SectionHeader"
import SkillBar from "./SkillBar"

const skills = [
  { name: "Python/R/C++", level: 95 },
  { name: "Machine Learning & AI", level: 95 },
  { name: "GenAI & LLMs", level: 90 },
  { name: "NLP & Computer Vision", level: 90 },
  { name: "Cloud & MLOps", level: 85 },
  { name: "Statistical Analysis", level: 90 },
  { name: "Data Visualization", level: 88 },
  { name: "Software Engineering", level: 85 },
]

const technologies = [
  "PyTorch", "TensorFlow", "Scikit-Learn", "Keras", "GPT-5", "BERT", "RAG",
  "LangChain", "TensorRT-LLM", "vLLM", "Llama", "Transformers", "SpaCy",
  "OpenCV", "UNET", "Docker", "Kubernetes", "Azure", "GCP", "Vertex AI",
  "PostgreSQL", "MongoDB", "Vector DB", "FastAPI", "Flask", "React",
  "Pandas", "NumPy", "SciPy", "Tableau", "Power BI", "Weights & Biases",
]

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <SectionHeader
        eyebrow="Expertise"
        title="Technical"
        italicWord="Skills"
      />

      <div className="max-w-4xl mx-auto px-4">
        <GlowingCard gradient="linear-gradient(137deg, #FF3D77 0%, #7DD3FC 45%, #4361EE 100%)">
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
            ))}
          </div>
        </GlowingCard>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full px-4 py-2 text-xs bg-[#1A1A1C] border border-white/10 text-muted hover:border-[#7DD3FC] transition-colors"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
