import { motion } from "motion/react"

export default function Footer() {
  return (
    <motion.footer
      className="py-8 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-muted text-sm">
        &copy; 2026 Naman Pandey. Built with React, Motion &amp; Tailwind CSS
      </p>
    </motion.footer>
  )
}
