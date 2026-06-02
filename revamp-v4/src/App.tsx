import Navbar from './components/Navbar'
import ChromaKeyVideo from './components/ChromaKeyVideo'
import HeroContent from './components/HeroContent'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="relative bg-white text-neutral-900 font-sans antialiased overflow-x-hidden">
      <Navbar />
      <ChromaKeyVideo />

      {/* Content — scrolls underneath the chroma key person overlay */}
      <div className="relative min-h-screen bg-white px-6 sm:px-10 lg:px-16">
        <HeroContent />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />

        <footer className="py-8 text-center text-xs text-[#738273] border-t border-[#F1F3F1] mt-8">
          © 2026 Naman Pandey. Built with React, Motion & Tailwind CSS
        </footer>
      </div>
    </div>
  )
}
