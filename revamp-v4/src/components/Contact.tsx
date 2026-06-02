import { useRef, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { Mail, Linkedin, Github } from 'lucide-react'
import SectionHeader from './SectionHeader'

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append("access_key", "5aebb5ee-5e4c-441a-9731-dbda0921ab2c")
    formData.append("subject", "New Contact Form Submission")

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        alert("Message sent successfully!")
        form.reset()
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch {
      alert("Failed to send message. Please check your connection.")
    }
  }

  return (
    <section id="contact" className="section-spacer py-24">
      <div className="w-full max-w-xl">
        <SectionHeader
          eyebrow="Contact"
          title="Get In"
          italicWord="Touch"
          description="Available for strategic AI consulting, technical leadership, and research collaborations."
        />

        <motion.div
          className="mt-10 space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <a href="mailto:namanp95@gmail.com" className="block text-2xl font-medium text-[#1C2E1E] hover:text-[#4D6D47] transition-colors">
            namanp95@gmail.com
          </a>
          <p className="text-sm text-[#5A635A]">+44 7307 658109</p>

          <div className="flex gap-6 pt-4">
            <a href="https://linkedin.com/in/nmn-pandey" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#5A635A] hover:text-[#1C2E1E] transition-colors">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href="https://github.com/nmn-pandey" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#5A635A] hover:text-[#1C2E1E] transition-colors">
              <Github size={16} /> GitHub
            </a>
          </div>

          <div className="bg-[#FAFBF9] border border-[#F1F3F1] rounded-2xl p-6 mt-8">
            <p className="text-xs text-[#738273] uppercase tracking-wider mb-4">Send a message</p>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Name" className="w-full bg-transparent border-b border-[#F1F3F1] py-2 text-sm text-[#1C2E1E] placeholder:text-[#738273] focus:outline-none focus:border-[#4D6D47] transition-colors" required />
              <input type="email" name="email" placeholder="Email" className="w-full bg-transparent border-b border-[#F1F3F1] py-2 text-sm text-[#1C2E1E] placeholder:text-[#738273] focus:outline-none focus:border-[#4D6D47] transition-colors" required />
              <textarea name="message" placeholder="Message" rows={3} className="w-full bg-transparent border-b border-[#F1F3F1] py-2 text-sm text-[#1C2E1E] placeholder:text-[#738273] focus:outline-none focus:border-[#4D6D47] transition-colors resize-none" required />
              <button type="submit" className="bg-[#1C2E1E] text-white text-sm px-6 py-2.5 rounded-full hover:bg-[#2a4530] transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
