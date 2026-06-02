import { motion } from "motion/react"
import { Mail, Phone, Linkedin, Github, BookOpen } from "lucide-react"
import GlowingCard from "./GlowingCard"
import GlowingButton from "./GlowingButton"
import SectionHeader from "./SectionHeader"

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <SectionHeader
        eyebrow="Contact"
        title="Get In"
        italicWord="Touch"
      />

      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-[#FF3D77] via-[#7DD3FC] to-[#4361EE] bg-clip-text text-transparent">
              Let's work together
            </span>
          </h3>

          <div className="space-y-6">
            <a
              href="mailto:namanp95@gmail.com"
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1A1A1C] border border-white/10 flex items-center justify-center group-hover:border-[#7DD3FC] transition-colors">
                <Mail className="w-5 h-5 text-[#7DD3FC]" />
              </div>
              <div>
                <p className="text-xs text-muted">Email</p>
                <p className="text-white font-medium">namanp95@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:+447307658109"
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1A1A1C] border border-white/10 flex items-center justify-center group-hover:border-[#7DD3FC] transition-colors">
                <Phone className="w-5 h-5 text-[#7DD3FC]" />
              </div>
              <div>
                <p className="text-xs text-muted">Phone</p>
                <p className="text-white font-medium">+44 7307 658109</p>
              </div>
            </a>

            <div className="pt-4">
              <p className="text-xs text-muted mb-3">Social</p>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/in/namanpandey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1A1A1C] border border-white/10 flex items-center justify-center hover:border-[#7DD3FC] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-muted" />
                </a>
                <a
                  href="https://github.com/nmn-pandey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1A1A1C] border border-white/10 flex items-center justify-center hover:border-[#7DD3FC] transition-colors"
                >
                  <Github className="w-4 h-4 text-muted" />
                </a>
                <a
                  href="https://medium.com/@namanpandey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1A1A1C] border border-white/10 flex items-center justify-center hover:border-[#7DD3FC] transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-muted" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <GlowingCard gradient="linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-transparent border-b border-white/10 focus:border-[#7DD3FC] outline-none py-3 text-white text-sm placeholder:text-muted/50 transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-transparent border-b border-white/10 focus:border-[#7DD3FC] outline-none py-3 text-white text-sm placeholder:text-muted/50 transition-colors"
              />
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full bg-transparent border-b border-white/10 focus:border-[#7DD3FC] outline-none py-3 text-white text-sm placeholder:text-muted/50 transition-colors resize-none"
              />
            </div>
            <GlowingButton variant="primary">Send Message</GlowingButton>
          </form>
        </GlowingCard>
      </div>
    </section>
  )
}
