import { useState, useRef, useEffect } from 'react'
import { servicesData } from '../data/services'
import { contactInfo } from '../data/contact'

export default function Services({ prefillBooking }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const [hoveredCard, setHoveredCard] = useState(null)

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

  const handleCardMouseMove = (e, index) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  }

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="relative py-24 px-4 bg-bg-deepest overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 diagonal-grid" />
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-teal/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-electric-teal/10 border border-electric-teal/20 rounded-full px-4 py-1.5 mb-6">
            <svg className="w-4 h-4 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="font-chakra text-[0.65rem] tracking-[0.25em] text-electric-teal uppercase">
              What We Offer
            </span>
          </div>
          
          <h2 className="font-cabinet font-black text-white-pearl leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Every Journey,<br />
            <span className="text-electric-teal">Perfectly Handled</span>
          </h2>
          
          <p className="font-satoshi text-white-pearl/50 text-lg max-w-2xl mx-auto">
            From quick city rides to multi-day outstation journeys, we've got you covered with professional service and transparent pricing.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, i) => (
            <div
              key={service.id}
              onMouseMove={(e) => handleCardMouseMove(e, i)}
              onMouseLeave={handleCardMouseLeave}
              onMouseEnter={() => setHoveredCard(i)}
              className={`relative bg-gradient-to-br from-bg-card/80 to-bg-card/40 backdrop-blur-sm border border-electric-teal/10 rounded-3xl p-8 transition-all duration-500 cursor-pointer group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${i * 80}ms`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-electric-teal/0 via-electric-teal/5 to-electric-teal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Tag */}
              {service.badge && (
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-electric-teal to-bright-teal text-bg-deepest text-[9px] font-bold font-chakra px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  {service.badge}
                </div>
              )}

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-2xl bg-electric-teal/10 border border-electric-teal/20 flex items-center justify-center mb-6 group-hover:bg-electric-teal/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <svg className="w-7 h-7 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                </svg>
              </div>

              {/* Content */}
              <h3 className="font-cabinet font-bold text-white-pearl text-xl mb-3 group-hover:text-electric-teal transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="font-satoshi text-white-pearl/60 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* CTA Link */}
              <button
                onClick={() => {
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 text-electric-teal text-sm font-semibold font-satoshi group-hover:gap-3 transition-all duration-300"
              >
                Book Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {/* Bottom border glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-electric-teal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <p className="font-satoshi text-white-pearl/40 text-sm mb-6">
            Can't find what you're looking for?
          </p>
          <button
            onClick={() => window.open(`https://wa.me/${contactInfo.whatsappRaw}?text=` + encodeURIComponent('Hi! I have a custom travel requirement.'), '_blank')}
            className="inline-flex items-center gap-3 bg-white-pearl/5 hover:bg-electric-teal/10 border border-electric-teal/20 hover:border-electric-teal/40 text-white-pearl hover:text-electric-teal rounded-full px-8 py-4 font-satoshi font-semibold transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Contact Us for Custom Requirements
          </button>
        </div>
      </div>
    </section>
  )
}
