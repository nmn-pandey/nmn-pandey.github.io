import { motion } from 'motion/react'
import SectionHeader from './SectionHeader'

const experience = [
  {
    title: 'Data Scientist - R&D',
    company: 'Blatchford Mobility',
    period: 'Apr 2024 - Present',
    description: 'Architected end-to-end ML pipelines for processing and analysing large multimodal medical sensor datasets. Developed ML models for Gait Phase Identification and abnormal gait detection.',
    location: 'United Kingdom',
  },
  {
    title: 'Technical Project Manager',
    company: 'Mercor',
    period: 'Aug 2025 - Present',
    description: 'Leading AI evaluation and rubric grading projects for top AI labs, managing cross-functional teams and deliverables.',
    location: 'United States (Remote)',
  },
  {
    title: 'Machine Learning Engineer',
    company: 'Mercor',
    period: 'Apr 2024 - Aug 2024',
    description: 'Engineered scalable ML pipelines for open-source LLM deployment using TensorRT-LLM and vLLM.',
    location: 'United States (Remote)',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section-spacer py-24">
      <div className="w-full max-w-xl">
        <SectionHeader
          eyebrow="Career"
          title="My"
          italicWord="Experience"
          description="9+ years of cross-industry expertise in AI, data science, and software engineering."
        />

        <div className="mt-10 space-y-6">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="border-l-2 border-[#EAECE9] pl-5 py-2 hover:border-[#4D6D47] transition-colors"
            >
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-base font-medium text-[#1C2E1E]">{exp.title}</h3>
                <span className="text-[11px] text-[#738273] bg-[#FAFBF9] border border-[#F1F3F1] px-2 py-0.5 rounded-full">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-[#4D6D47] font-medium mb-2">{exp.company}</p>
              <p className="text-sm text-[#5A635A] leading-relaxed">{exp.description}</p>
              <p className="text-xs text-[#738273] mt-1">{exp.location}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-[#F1F3F1]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-sm font-medium text-[#1C2E1E] mb-4">Education</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[#1C2E1E]">MSc Artificial Intelligence</p>
              <p className="text-xs text-[#4D6D47]">Brunel University, London — Distinction (2022-2023)</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#1C2E1E]">BTech Computer Science</p>
              <p className="text-xs text-[#4D6D47]">Birla Institute of Applied Sciences — Merit (2012-2016)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
