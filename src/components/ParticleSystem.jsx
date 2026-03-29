import { useCallback, useState, useEffect } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleSystem() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // Only render particles on desktop devices
    const checkDevice = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
      
      // Disable particles on mobile or low-end devices for performance
      setShouldRender(!isMobile && !isLowEnd)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  // Don't render on mobile - huge performance boost
  if (!shouldRender) {
    return null
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: 'transparent'
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 35,
            density: {
              enable: true,
              area: 900
            }
          },
          color: {
            value: ['#00D4C8', '#38BDF8', '#00FFED', '#EEF4FF']
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: 0.3,
            random: true,
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
              minimumValue: 0.05
            }
          },
          size: {
            value: { min: 1, max: 2 }
          },
          links: {
            enable: true,
            distance: 120,
            color: '#00D4C8',
            opacity: 0.06,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
              default: 'out'
            }
          }
        },
        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: {
              enable: true,
              mode: 'repulse'
            },
            resize: {
              enable: true
            }
          },
          modes: {
            repulse: {
              distance: 80,
              duration: 0.4
            }
          }
        },
        detectRetina: true
      }}
      className="absolute inset-0 z-[2] pointer-events-none"
    />
  )
}
