import { motion } from "motion/react"
import { MapPin, Mail, GraduationCap, Phone, Briefcase } from "lucide-react"
import GlowingCard from "./GlowingCard"
import SectionHeader from "./SectionHeader"

const metrics = [
  { label: "Years Experience", value: "9+" },
  { label: "Projects Delivered", value: "50+" },
  { label: "Industries Served", value: "6+" },
  { label: "Countries Worked", value: "3" },
]

export default function About() {
  return (
    <section id="about" className="py-24">
      <SectionHeader
        eyebrow="About"
        title="Who I"
        italicWord="Am"
        description="A passionate AI/Data professional dedicated to transforming complex data into actionable intelligence and innovative solutions."
      />

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
        <GlowingCard gradient="linear-gradient(137deg, #7DD3FC 0%, #4361EE 45%, #E0AEFF 100%)">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FF3D77] via-[#7DD3FC] to-[#4361EE] p-[3px] mb-4">
              <div className="w-full h-full rounded-full bg-[#0A0A0B] flex items-center justify-center text-2xl font-bold text-white">
                NP
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Naman Pandey</h3>
            <div className="space-y-2 text-sm text-muted">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                United Kingdom
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                namanp95@gmail.com
              </div>
              <div className="flex items-center justify-center gap-2">
                <GraduationCap className="w-3.5 h-3.5" />
                MSc Artificial Intelligence
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                +44 7307 658109
              </div>
              <div className="flex items-center justify-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                Open to opportunities
              </div>
            </div>
          </div>
        </GlowingCard>

        <div className="flex flex-col justify-center">
          <motion.p
            className="text-muted text-sm leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            With over 9 years of experience spanning data science, machine learning engineering, and
            technical project management, I bring a unique blend of technical depth and strategic
            vision to every project. My work has touched industries from healthcare and pharmaceuticals
            to finance and academia, across three countries.
          </motion.p>
          <motion.p
            className="text-muted text-sm leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            I specialize in building end-to-end AI systems, from research and prototyping to
            production deployment. Whether it's training deep learning models for medical imaging or
            architecting LLM-powered applications, I'm driven by the challenge of turning cutting-edge
            research into real-world impact.
          </motion.p>

          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                className="text-center p-4 rounded-xl bg-[#1A1A1C] border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-[#FF3D77] via-[#7DD3FC] to-[#4361EE] bg-clip-text text-transparent">
                  {m.value}
                </div>
                <div className="text-xs text-muted mt-1">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
