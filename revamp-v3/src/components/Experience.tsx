import { motion } from "motion/react"
import GlowingCard from "./GlowingCard"
import SectionHeader from "./SectionHeader"

const experiences = [
  {
    title: "Data Scientist - R&D",
    company: "Blatchford Mobility",
    period: "Apr 2024 - Present",
    description:
      "Architected end-to-end ML pipelines for processing and analysing large multimodal medical sensor datasets. Developed ML models for Gait Phase Identification and abnormal gait detection. Implemented MLOps practices in Azure and governance protocols for sensitive healthcare data.",
    location: "United Kingdom",
  },
  {
    title: "Technical Project Manager",
    company: "Mercor",
    period: "Aug 2025 - Present",
    description:
      "Leading AI evaluation and rubric grading projects for top AI labs, managing cross-functional teams and deliverables. Designing and implementing evaluation frameworks for LLMs and multimodal systems.",
    location: "United States (Remote)",
  },
  {
    title: "Machine Learning Engineer",
    company: "Mercor",
    period: "Apr 2024 - Aug 2024",
    description:
      "Engineered scalable ML pipelines for open-source LLM deployment using TensorRT-LLM and vLLM. Developed C++ and Python benchmarking scripts for performance validation of large-scale models.",
    location: "United States (Remote)",
  },
  {
    title: "Research Assistant",
    company: "Brunel University",
    period: "Jul 2023 - Aug 2023",
    description:
      "Developed and deployed production-ready conversational AI chatbots using Python, LangChain and GPT-3 APIs. Led research on LLM applications in academic contexts.",
    location: "London, UK",
  },
  {
    title: "Process Analysis Engineer",
    company: "Pressco Technology Inc.",
    period: "May 2017 - Aug 2022",
    description:
      "Led cross-functional teams in implementing machine vision solutions for 50+ projects across F&B and pharma sectors.",
    location: "United States",
  },
  {
    title: "Software Developer",
    company: "Tata Consultancy Services Ltd.",
    period: "Jul 2016 - May 2017",
    description:
      "Engineered REST APIs for data integration between legacy and modern systems.",
    location: "India",
  },
]

const gradients = [
  "linear-gradient(137deg, #FF3D77 0%, #7DD3FC 45%, #4361EE 100%)",
  "linear-gradient(137deg, #7DD3FC 0%, #4361EE 45%, #E0AEFF 100%)",
  "linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)",
  "linear-gradient(137deg, #F72585 0%, #FF9D3C 45%, #FF3D77 100%)",
  "linear-gradient(137deg, #06B6D4 0%, #4361EE 45%, #7DD3FC 100%)",
  "linear-gradient(137deg, #E0AEFF 0%, #F72585 45%, #FF3D77 100%)",
]

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <SectionHeader
        eyebrow="Resume"
        title="My"
        italicWord="Experience"
      />

      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {experiences.map((exp, i) => (
          <GlowingCard key={i} gradient={gradients[i % gradients.length]} delay={i * 0.1}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-white">{exp.title}</h3>
                <p className="text-sm text-[#7DD3FC]">{exp.company}</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-muted whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            <p className="text-sm text-muted mt-3 leading-relaxed">{exp.description}</p>
            <p className="text-xs text-muted/60 mt-2">{exp.location}</p>
          </GlowingCard>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-16">
        <motion.h3
          className="text-2xl font-bold text-white mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-[#FF3D77] via-[#7DD3FC] to-[#4361EE] bg-clip-text text-transparent">
            Education
          </span>
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-6">
          <GlowingCard gradient="linear-gradient(137deg, #7DD3FC 0%, #4361EE 100%)">
            <h4 className="font-bold text-white">MSc Artificial Intelligence</h4>
            <p className="text-sm text-[#7DD3FC]">Brunel University London</p>
            <p className="text-xs text-muted mt-1">2022 - 2023 (Distinction)</p>
          </GlowingCard>
          <GlowingCard gradient="linear-gradient(137deg, #4361EE 0%, #E0AEFF 100%)">
            <h4 className="font-bold text-white">BTech Computer Science</h4>
            <p className="text-sm text-[#7DD3FC]">Birla Institute of Applied Sciences</p>
            <p className="text-xs text-muted mt-1">2012 - 2016 (Merit)</p>
          </GlowingCard>
        </div>
      </div>

      <motion.div
        className="max-w-3xl mx-auto px-4 mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-white mb-8">
          <span className="bg-gradient-to-r from-[#FF3D77] via-[#7DD3FC] to-[#4361EE] bg-clip-text text-transparent">
            Certifications
          </span>
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {["AWS Certified ML", "Azure AI Engineer", "Deep Learning Specialization", "NLP with Transformers"].map((cert) => (
            <span
              key={cert}
              className="rounded-full px-4 py-2 text-xs bg-[#1A1A1C] border border-white/10 text-muted"
            >
              {cert}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
