import { motion } from 'motion/react'
import SectionHeader from './SectionHeader'

const skills = [
  { name: 'Python / R / C++', level: 95 },
  { name: 'Machine Learning & AI', level: 95 },
  { name: 'GenAI & LLMs', level: 90 },
  { name: 'NLP & Computer Vision', level: 90 },
  { name: 'Cloud & MLOps', level: 85 },
  { name: 'Statistical Analysis', level: 90 },
  { name: 'Data Visualization', level: 88 },
  { name: 'Software Engineering', level: 85 },
]

const technologies = [
  'PyTorch', 'TensorFlow', 'Scikit-Learn', 'GPT-5', 'BERT', 'RAG',
  'LangChain', 'TensorRT-LLM', 'vLLM', 'Llama', 'Transformers', 'SpaCy',
  'OpenCV', 'Docker', 'Kubernetes', 'Azure', 'GCP', 'Vertex AI',
  'PostgreSQL', 'MongoDB', 'Vector DB', 'FastAPI', 'Flask', 'React',
  'Pandas', 'NumPy', 'SciPy', 'Tableau', 'Power BI', 'Weights & Biases',
]

const gradients = [
  'from-emerald-500 to-teal-400',
  'from-blue-500 to-cyan-400',
  'from-violet-500 to-purple-400',
  'from-rose-500 to-pink-400',
  'from-amber-500 to-orange-400',
  'from-teal-500 to-emerald-400',
  'from-indigo-500 to-blue-400',
  'from-pink-500 to-rose-400',
]

export default function Skills() {
  return (
    <section id="skills" className="section-spacer py-24">
      <div className="w-full max-w-xl">
        <SectionHeader
          eyebrow="Expertise"
          title="Technical"
          italicWord="Skills"
          description="From programming to AI and data analysis, I bring a diverse skill set honed through academic study and hands-on experience."
        />

        <div className="mt-10 space-y-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium text-[#1C2E1E]">{skill.name}</span>
                <span className="text-sm text-[#738273]">{skill.level}%</span>
              </div>
              <div className="h-2 bg-[#F1F3F1] rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${gradients[i % gradients.length]}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-sm font-medium text-[#1C2E1E] mb-4">Technologies & Tools</h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1.5 rounded-full bg-white border border-[#F1F3F1] text-[#5A635A] hover:border-[#4D6D47] hover:text-[#1C2E1E] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
