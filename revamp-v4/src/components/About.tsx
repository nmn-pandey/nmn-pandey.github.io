import { motion } from 'motion/react'
import SectionHeader from './SectionHeader'

export default function About() {
  return (
    <section id="about" className="section-spacer py-24">
      <div className="w-full max-w-xl">
        <SectionHeader
          eyebrow="About"
          title="Who I"
          italicWord="Am"
          description="A passionate AI / Data professional with 9+ years of cross-industry experience."
        />

        <div className="mt-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-[#5A635A] leading-relaxed">
              Versatile Software Engineer with 9+ years of cross-industry experience implementing end-to-end AI solutions,
              NLP systems, and computer vision applications across healthcare, finance, and industrial sectors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[#5A635A] leading-relaxed">
              Expert in Python development alongside cloud AI services using GCP, Azure and MLOps.
              Currently building healthcare-focused ML pipelines at Blatchford Mobility.
              Eligible to work unrestricted in the UK and India.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-6 pt-4"
          >
            {[
              { label: 'Location', value: 'London, UK' },
              { label: 'Degree', value: 'MSc in AI' },
              { label: 'Email', value: 'namanp95@gmail.com' },
              { label: 'Freelance', value: 'Available' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-[#738273] uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-medium text-[#1C2E1E] mt-1">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
