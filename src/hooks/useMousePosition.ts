import { useState, useEffect } from 'react'

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [cursor, setCursor] = useState<'link' | 'next' | 'prev' | 'view' | null>(null)

  useEffect(() => {
    const handlePosition = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (e && e.target && e.target.getAttribute('data-cursor')) {
        if (
          (e.target as HTMLElement).getAttribute('data-cursor') === 'link' ||
          (e.target as HTMLElement).tagName === 'A'
        ) {
          setCursor('link')
        } else if (e.target.getAttribute('data-cursor') === 'next') {
          setCursor('next')
        } else if (e.target.getAttribute('data-cursor') === 'prev') {
          setCursor('prev')
        } else if (e.target.getAttribute('data-cursor') === 'view') {
          setCursor('view')
        } else if (e.target.getAttribute('data-cursor') === null) {
          setCursor(null)
        }
      } else {
        setCursor(null)
      }
    }

    window.addEventListener('mousemove', handlePosition)
    return () => window.removeEventListener('mousemove', handlePosition)
  }, [])
  return { ...mousePosition, cursor }
}

export default useMousePosition
