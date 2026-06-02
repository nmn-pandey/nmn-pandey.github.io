import { Cpu, Globe, Database, Code2, Briefcase } from "lucide-react"
import GlowingCard from "./GlowingCard"
import GlowingButton from "./GlowingButton"
import SectionHeader from "./SectionHeader"

const projects = [
  {
    icon: Cpu,
    title: "Brain Tumour Segmentation",
    description:
      "3D MRI segmentation using Swin-Transformers. Achieved 0.795 Dice score in BraTS 2023 benchmarks.",
    tech: ["Medical AI", "Deep Learning", "PyTorch", "Swin Transformers", "3D CNN", "MRI Analysis"],
    github: "https://github.com/nmn-pandey/brain-tumour-segmentation",
    gradient: "linear-gradient(137deg, #FF3D77 0%, #7DD3FC 45%, #4361EE 100%)",
  },
  {
    icon: Globe,
    title: "Dialogue Insights Generator",
    description:
      "Web app leveraging GPT-3.5 and WhisperX for conversational analysis and psychological profiling.",
    tech: ["NLP", "Generative AI", "GPT-3.5", "WhisperX", "React", "FastAPI"],
    github: "https://github.com/nmn-pandey/dialogue-analyser",
    gradient: "linear-gradient(137deg, #7DD3FC 0%, #4361EE 45%, #E0AEFF 100%)",
  },
  {
    icon: Database,
    title: "Fortune 1000 Analytics",
    description:
      "Interactive Tableau dashboard analyzing CEO diversity and business growth trends (2019-2021).",
    tech: ["Data Strategy", "Data Visualization", "Tableau", "SQL", "Python", "ETL Pipelines"],
    github: "https://public.tableau.com/...",
    gradient: "linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)",
  },
  {
    icon: Code2,
    title: "Student Dropout Prediction",
    description:
      "ML models predicting academic success using demographic and academic data. Achieved 76% accuracy.",
    tech: ["Predictive Analytics", "Scikit-Learn", "Classification", "Feature Engineering", "XGBoost"],
    github: "https://github.com/nmn-pandey/student-dropout-prediction",
    gradient: "linear-gradient(137deg, #F72585 0%, #FF9D3C 45%, #FF3D77 100%)",
  },
  {
    icon: Briefcase,
    title: "Missing Money Matters",
    description:
      "Investigating financial discrepancies using SQLite and MongoDB for WSDA Music records.",
    tech: ["SQL", "NoSQL Analysis", "SQLite", "MongoDB", "Data Auditing", "Financial Analytics"],
    github: "https://github.com/nmn-pandey/Missing-Money-Matters",
    gradient: "linear-gradient(137deg, #06B6D4 0%, #4361EE 45%, #7DD3FC 100%)",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <SectionHeader
        eyebrow="Portfolio"
        title="Featured"
        italicWord="Projects"
      />

      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => {
          const Icon = project.icon
          return (
            <GlowingCard key={i} gradient={project.gradient} delay={i * 0.1}>
              <Icon className="w-10 h-10 text-[#7DD3FC] mb-4" />
              <h3 className="font-bold text-white">{project.title}</h3>
              <p className="text-sm text-muted mt-2 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-2.5 py-1 text-[10px] bg-[#0A0A0B] border border-white/10 text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <GlowingButton href={project.github} variant="outline">
                  GitHub
                </GlowingButton>
              </div>
            </GlowingCard>
          )
        })}
      </div>
    </section>
  )
}
