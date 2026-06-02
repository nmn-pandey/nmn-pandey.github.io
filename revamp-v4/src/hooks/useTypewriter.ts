import { useState, useEffect, useCallback } from 'react'

interface UseTypewriterReturn {
  displayed: string
  done: boolean
}

export function useTypewriter(text: string, speed = 38, startDelay = 600): UseTypewriterReturn {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  const startTyping = useCallback(() => {
    let index = 0
    setDisplayed('')
    setDone(false)

    const interval = setInterval(() => {
      index++
      setDisplayed(text.slice(0, index))

      if (index >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const cleanup = startTyping()
      return cleanup
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [startDelay, startTyping])

  return { displayed, done }
}
