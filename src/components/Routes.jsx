import { useState, useRef, useEffect } from 'react'
import { routesData } from '../data/routes'

export default function Routes({ prefillBooking }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="routes" className="py-20 px-4 bg-bg-deep">
      <div className="max-w-7xl mx-auto">
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="font-chakra text-xs tracking-[0.25em] text-electric-teal uppercase mb-3">POPULAR ROUTES</div>
          <h2 className="font-cabinet font-extrabold text-white-pearl" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Your Most-Traveled<br />
            <span className="teal-text">Paths, Covered.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {routesData.map((route, i) => (
            <div
              key={route.id}
              onClick={() => prefillBooking({ pickup: route.origin, drop: route.destination })}
              className={`relative bg-bg-card border border-electric-teal/10 rounded-2xl p-5 cursor-pointer group hover:border-electric-teal/35 hover:shadow-[0_0_30px_rgba(0,212,200,0.07)] transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-cabinet font-bold text-white-pearl text-lg mb-3">
                {route.origin} <span className="text-electric-teal mx-1.5">→</span> {route.destination}
              </div>
              <div className="flex gap-2 mb-3">
                <span className="bg-white-pearl/4 border border-electric-teal/10 rounded-full px-3 py-0.5 text-xs font-chakra text-white-pearl/45">
                  {route.distance}
                </span>
                <span className="bg-white-pearl/4 border border-electric-teal/10 rounded-full px-3 py-0.5 text-xs font-chakra text-white-pearl/45">
                  {route.duration}
                </span>
              </div>
              <div className="text-xs font-satoshi font-semibold text-electric-teal group-hover:underline flex items-center gap-1">
                Book This Route
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
