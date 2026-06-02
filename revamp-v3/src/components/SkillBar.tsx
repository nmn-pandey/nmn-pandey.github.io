import { motion } from "motion/react"

interface SkillBarProps {
  name: string
  level: number
  index: number
}

const gradients = [
  "linear-gradient(90deg, #FF3D77, #FFB1CE)",
  "linear-gradient(90deg, #7DD3FC, #06B6D4)",
  "linear-gradient(90deg, #4361EE, #E0AEFF)",
  "linear-gradient(90deg, #F72585, #FF9D3C)",
  "linear-gradient(90deg, #06B6D4, #4361EE)",
  "linear-gradient(90deg, #E0AEFF, #F72585)",
  "linear-gradient(90deg, #FFB1CE, #FF3D77)",
  "linear-gradient(90deg, #7DD3FC, #4361EE)",
]

export default function SkillBar({ name, level, index }: SkillBarProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-sm text-muted">{level}%</span>
      </div>
      <div className="h-2 bg-[#1A1A1C] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: gradients[index % gradients.length] }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}
