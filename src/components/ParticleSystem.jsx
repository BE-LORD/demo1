import { useCallback } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleSystem() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

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
            value: isMobile ? 22 : 55,
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
            value: 0.35,
            random: true,
            animation: {
              enable: true,
              speed: 0.6,
              sync: false,
              minimumValue: 0.05
            }
          },
          size: {
            value: { min: 1, max: 2.5 }
          },
          links: {
            enable: true,
            distance: 130,
            color: '#00D4C8',
            opacity: 0.07,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.5,
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
              distance: 90,
              duration: 0.5
            }
          }
        },
        detectRetina: true
      }}
      className="absolute inset-0 z-[2] pointer-events-none"
    />
  )
}
