import type { ReactNode } from "react"
import { motion } from "motion/react"

interface GlowingCardProps {
  children: ReactNode
  gradient?: string
  className?: string
  delay?: number
}

export default function GlowingCard({ children, gradient = "linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)", className = "", delay = 0 }: GlowingCardProps) {
  return (
    <motion.div
      className={`relative flex flex-col ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 opacity-50 rounded-2xl pointer-events-none"
        style={{ background: gradient, filter: "blur(35px)" }}
      />
      {/* Foreground with border */}
      <div
        className="relative z-10 rounded-2xl overflow-hidden"
        style={{
          border: "2px solid transparent",
          background: `linear-gradient(#1A1A1C, #1A1A1C) padding-box, ${gradient} border-box`,
        }}
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    </motion.div>
  )
}
