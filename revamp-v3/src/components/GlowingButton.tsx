import type { ReactNode } from "react"

interface GlowingButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "outline"
  className?: string
}

export default function GlowingButton({ children, href, onClick, variant = "primary", className = "" }: GlowingButtonProps) {
  const baseClass = "relative group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
  
  const primaryClass = "bg-white text-[#0A0A0B] hover:bg-transparent hover:text-white"
  const outlineClass = "border border-[#1A1A1C] text-white hover:border-transparent"

  const button = (
    <button
      onClick={onClick}
      className={`${baseClass} ${variant === "primary" ? primaryClass : outlineClass} ${className}`}
    >
      <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(137deg, #FF3D77 0%, #7DD3FC 45%, #4361EE 100%)",
          zIndex: -1,
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  )

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{button}</a>
  }

  return button
}
