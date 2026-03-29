import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const logoText = 'V3 TOUR & TRAVELS'

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 40)

    // Complete animation after 2400ms
    const timer = setTimeout(() => {
      onComplete()
    }, 2400)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] bg-bg-deepest flex flex-col items-center justify-center overflow-hidden">
      {/* Speed Line */}
      <div 
        className="absolute top-1/2 left-0 h-[2px] w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, #00D4C8, #00FFED, transparent)',
          animation: 'speedLine 400ms ease-out forwards'
        }}
      />

      {/* Logo Text */}
      <div className="relative z-10 flex flex-wrap justify-center gap-x-2 px-4">
        {logoText.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block overflow-hidden"
            style={{
              animationDelay: `${350 + index * 55}ms`
            }}
          >
            <span
              className={`inline-block font-chakra font-semibold tracking-[0.15em] uppercase ${
                char === 'V' || char === '3' ? 'text-electric-teal' : 'text-white-pearl'
              }`}
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                animation: 'charIn 300ms ease-out forwards',
                animationDelay: `${350 + index * 55}ms`,
                transform: 'translateY(100%)'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
      </div>

      {/* Tagline */}
      <div
        className="mt-4 font-satoshi text-xs tracking-[0.25em] uppercase text-electric-teal/60 opacity-0"
        style={{
          animation: 'fadeIn 500ms ease-out 1200ms both'
        }}
      >
        WHERE COMFORT MEETS JOURNEY
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-electric-teal to-bright-teal origin-left"
           style={{ transform: `scaleX(${progress / 100})` }}
      />

      <style jsx>{`
        @keyframes speedLine {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100vw);
          }
        }

        @keyframes charIn {
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
