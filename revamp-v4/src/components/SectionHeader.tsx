import { motion } from 'motion/react'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  italicWord?: string
  description?: string
}

export default function SectionHeader({ eyebrow, title, italicWord, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-[#738273] mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-medium text-[#1C2E1E] tracking-tight">
        {title}{italicWord ? <span className="italic"> {italicWord}</span> : null}
      </h2>
      {description && (
        <p className="text-[#5A635A] text-sm md:text-base mt-3 max-w-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}
