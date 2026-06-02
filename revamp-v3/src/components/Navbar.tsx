import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Download } from "lucide-react"

const navItems = ["Home", "About", "Skills", "Experience", "Projects", "Contact"]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("Home")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    navItems.forEach((item) => {
      const el = document.getElementById(item.toLowerCase())
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(item)
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <motion.div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-[#1A1A1C]/80 px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-black/20" : ""
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <button
          onClick={() => scrollTo("home")}
          className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FF3D77] via-[#7DD3FC] to-[#4361EE] p-[2px] mr-2 shrink-0"
        >
          <div className="w-full h-full rounded-full bg-[#0A0A0B] flex items-center justify-center text-xs font-bold text-white">
            NP
          </div>
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors duration-200 ${
                active === item
                  ? "text-white bg-white/10"
                  : "text-muted hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-white text-[#0A0A0B] px-4 py-1.5 text-sm font-medium hover:bg-transparent hover:text-white transition-all duration-300"
        >
          <Download className="w-3.5 h-3.5" />
          Resume
        </a>
      </motion.div>
    </nav>
  )
}
