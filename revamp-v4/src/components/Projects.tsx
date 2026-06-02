import { motion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import SectionHeader from './SectionHeader'

const projects = [
  {
    title: 'Brain Tumour Segmentation',
    description: '3D MRI segmentation using Swin-Transformers. Achieved 0.795 Dice score in BraTS 2023 benchmarks.',
    tech: ['Medical AI', 'Deep Learning', 'PyTorch', 'Swin Transformers'],
    github: 'https://github.com/nmn-pandey/brain-tumour-segmentation',
  },
  {
    title: 'Dialogue Insights Generator',
    description: 'Web app leveraging GPT-3.5 and WhisperX for conversational analysis and psychological profiling.',
    tech: ['NLP', 'Generative AI', 'GPT-3.5', 'React', 'FastAPI'],
    github: 'https://github.com/nmn-pandey/dialogue-analyser',
  },
  {
    title: 'Fortune 1000 Analytics',
    description: 'Interactive Tableau dashboard analyzing CEO diversity and business growth trends (2019-2021).',
    tech: ['Data Viz', 'Tableau', 'SQL', 'Python', 'ETL'],
    github: 'https://public.tableau.com/app/profile/naman.pandey/viz/Fortune1000Analysis_17064900121200/FinalDashboardClust-Interact2',
  },
  {
    title: 'Student Dropout Prediction',
    description: 'ML models predicting academic success using demographic and academic data. Achieved 76% accuracy.',
    tech: ['Scikit-Learn', 'XGBoost', 'Classification', 'Feature Engineering'],
    github: 'https://github.com/nmn-pandey/student-dropout-prediction',
  },
]

const gradients = [
  'from-emerald-50 to-teal-50 border-emerald-200',
  'from-blue-50 to-cyan-50 border-blue-200',
  'from-violet-50 to-purple-50 border-violet-200',
  'from-amber-50 to-orange-50 border-amber-200',
]

export default function Projects() {
  return (
    <section id="projects" className="section-spacer py-24">
      <div className="w-full max-w-xl">
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured"
          italicWord="Projects"
          description="A selection of projects showcasing my work in AI, ML, and data science."
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-5 rounded-2xl border bg-gradient-to-br ${gradients[i]} hover:shadow-md transition-all group`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-medium text-[#1C2E1E]">{project.title}</h3>
                <ExternalLink size={14} className="text-[#738273] group-hover:text-[#1C2E1E] transition-colors shrink-0" />
              </div>
              <p className="text-xs text-[#5A635A] leading-relaxed mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/60 text-[#5A635A]">{t}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
