import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-20 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-[#1C2E1E] font-medium select-none">
            NP
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-sm text-[#5A635A]">
          {navLinks.map((link, i) => (
            <span key={link.label}>
              <a href={link.href} className="hover:text-[#1C2E1E] transition-colors px-2">{link.label}</a>
              {i < navLinks.length - 1 && <span className="opacity-30 mx-1">/</span>}
            </span>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline text-sm text-[#4D6D47] font-medium hover:text-[#1C2E1E] transition-colors"
        >
          Get in touch →
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-[2px] bg-[#1C2E1E] block transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-5 h-[2px] bg-[#1C2E1E] block transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-[2px] bg-[#1C2E1E] block transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </header>

      <div className={`md:hidden fixed inset-0 z-[19] bg-white/95 backdrop-blur-sm transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-2xl text-[#1C2E1E] hover:opacity-60" onClick={() => setIsMobileMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
