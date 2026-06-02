import { motion } from "motion/react"

interface SectionHeaderProps {
  eyebrow: string
  title: string
  italicWord?: string
  description?: string
}

export default function SectionHeader({ eyebrow, title, italicWord, description }: SectionHeaderProps) {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-muted mb-4">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
        {title}{italicWord ? <span className="bg-gradient-to-r from-[#FF3D77] via-[#7DD3FC] to-[#4361EE] bg-clip-text text-transparent"> {italicWord}</span> : null}
      </h2>
      {description && (
        <p className="text-muted text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}
