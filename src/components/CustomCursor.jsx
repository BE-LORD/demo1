import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  useEffect(() => {
    // Check if device has mouse (not touch-only)
    const hasMousePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasMousePointer) return

    let isInitialized = false

    const handleMouseMove = (e) => {
      if (!isInitialized) {
        // Initialize positions on first mouse move
        mousePos.current = { x: e.clientX, y: e.clientY }
        cursorPos.current = { x: e.clientX, y: e.clientY }
        dotPos.current = { x: e.clientX, y: e.clientY }
        isInitialized = true
      } else {
        mousePos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    // Smooth cursor animation with RAF
    const animate = () => {
      // Outer cursor follows with delay (smooth easing)
      const dx = mousePos.current.x - cursorPos.current.x
      const dy = mousePos.current.y - cursorPos.current.y
      
      cursorPos.current.x += dx * 0.15
      cursorPos.current.y += dy * 0.15

      // Inner dot follows faster
      const dotDx = mousePos.current.x - dotPos.current.x
      const dotDy = mousePos.current.y - dotPos.current.y
      
      dotPos.current.x += dotDx * 0.3
      dotPos.current.y += dotDy * 0.3

      // Update DOM only if elements exist
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px) translate(-50%, -50%)`
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }

  return (
    <>
      {/* Outer cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] transition-transform duration-200 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          willChange: 'transform',
          mixBlendMode: 'difference'
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-electric-teal opacity-50" />
      </div>

      {/* Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] transition-transform duration-150 ease-out ${
          isHovering ? 'scale-0' : 'scale-100'
        }`}
        style={{
          willChange: 'transform'
        }}
      >
        <div className="w-full h-full rounded-full bg-bright-teal shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
      </div>
    </>
  )
}
