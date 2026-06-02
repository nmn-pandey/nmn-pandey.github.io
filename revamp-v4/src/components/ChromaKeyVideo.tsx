import { useEffect, useRef, useCallback } from 'react'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4'

export default function ChromaKeyVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>(0)
  const scrollTimeRef = useRef(0)

  const handleScroll = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = Math.min(1, Math.max(0, scrollTop / docHeight))
    scrollTimeRef.current = progress * video.duration
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.crossOrigin = 'anonymous'
    video.src = VIDEO_URL
    video.load()

    const canPlay = () => {
      video.play().catch(() => {})

      const render = () => {
        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && video.duration) {
          video.currentTime += (scrollTimeRef.current - video.currentTime) * 0.15
        }
        rafRef.current = requestAnimationFrame(render)
      }
      render()
    }

    video.addEventListener('canplay', canPlay)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      video.removeEventListener('canplay', canPlay)
      window.removeEventListener('scroll', handleScroll)
      video.pause()
      video.src = ''
      video.load()
    }
  }, [handleScroll])

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      crossOrigin="anonymous"
      className="fixed inset-0 w-full h-full z-20 pointer-events-none object-cover"
      style={{ mixBlendMode: 'darken' }}
    />
  )
}
