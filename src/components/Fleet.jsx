import { useState, useRef, useEffect } from 'react'
import CarShowcase from './CarShowcase'

export default function Fleet({ prefillBooking }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  const cars = [
    { 
      type: "Sedan",
      carType: "sedan",
      color: "#00D4C8",
      emoji: "🚗", 
      examples: "Swift Dzire | Honda Amaze", 
      seats: "4 Passengers", 
      luggage: "2 Bags",
      features: ["Full AC", "Music System", "USB Charging", "Clean Interior"], 
      ideal: "Daily commute, solo & couple trips", 
      price: "Most economical",
      priceRange: "Rs 12-15/km"
    },
    { 
      type: "SUV",
      carType: "suv",
      color: "#38BDF8",
      emoji: "🚙", 
      examples: "Ertiga | Innova | Crysta", 
      seats: "6 Passengers", 
      luggage: "4 Bags",
      features: ["Spacious Cabin", "Extra Legroom", "Full AC", "Group Friendly"], 
      ideal: "Family trips, group outstation travel", 
      price: "Best value for groups", 
      priceRange: "Rs 18-22/km",
      highlighted: true 
    },
    { 
      type: "Premium",
      carType: "premium",
      color: "#FFD700",
      emoji: "🏎", 
      examples: "Innova Crysta | Toyota Camry", 
      seats: "4 Passengers", 
      luggage: "3 Bags",
      features: ["Luxury Interior", "Chauffeur Service", "Premium AC", "VIP Treatment"], 
      ideal: "Corporate, special occasions", 
      price: "Ultimate luxury experience",
      priceRange: "Rs 25-30/km"
    }
  ]

  const handleCardMouseMove = (e) => {
    if (isMobile) return // Disable 3D effect on mobile
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleCardMouseLeave = (e) => {
    if (isMobile) return // Disable 3D effect on mobile
    const card = e.currentTarget
    if (card.classList.contains('highlighted-card')) {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1.05)'
    } else {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="fleet" 
      className="relative py-24 px-4 bg-gradient-to-b from-bg-deepest to-bg-deep overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-electric-teal/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-electric-teal/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-electric-teal/10 border border-electric-teal/20 rounded-full px-4 py-1.5 mb-6">
            <svg className="w-4 h-4 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="font-chakra text-[0.65rem] tracking-[0.25em] text-electric-teal uppercase">
              Our Fleet
            </span>
          </div>
          
          <h2 className="font-cabinet font-black text-white-pearl leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Choose Your<br />
            <span className="text-electric-teal">Perfect Ride</span>
          </h2>
          
          <p className="font-satoshi text-white-pearl/50 text-lg max-w-2xl mx-auto">
            Well-maintained vehicles with professional drivers. Every car is sanitized, fully insured, and ready for your journey.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {cars.map((car, i) => (
            <div
              key={i}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className={`relative rounded-3xl p-8 transition-all duration-500 cursor-pointer ${
                car.highlighted ? 'highlighted-card' : ''
              } ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                transformStyle: 'preserve-3d',
                transform: car.highlighted ? 'scale(1.05)' : 'scale(1)',
                background: car.highlighted 
                  ? 'linear-gradient(135deg, rgba(18,18,18,0.95) 0%, rgba(26,26,26,0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(18,18,18,0.8) 0%, rgba(10,10,10,0.8) 100%)',
                border: car.highlighted 
                  ? '2px solid rgba(0,212,200,0.4)'
                  : '1px solid rgba(0,212,200,0.1)',
                boxShadow: car.highlighted
                  ? '0 0 60px rgba(0,212,200,0.15), 0 20px 60px rgba(0,0,0,0.5)'
                  : '0 10px 40px rgba(0,0,0,0.3)'
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-electric-teal/0 via-electric-teal/5 to-electric-teal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Popular badge */}
              {car.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-electric-teal to-bright-teal text-bg-deepest text-[10px] font-bold font-chakra px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg z-10">
                  Most Popular
                </div>
              )}
              
              {/* 3D Car Showcase */}
              <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-bg-deepest to-bg-deep">
                <CarShowcase type={car.carType} color={car.color} />
                
                {/* Interaction hint */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white-pearl/70 text-[10px] font-satoshi px-3 py-1 rounded-full border border-electric-teal/20">
                  Drag to rotate | Scroll to zoom
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <h3 className="font-cabinet font-bold text-white-pearl text-2xl mb-2">{car.type}</h3>
                <p className="font-satoshi text-sm text-white-pearl/50 mb-3">{car.examples}</p>
                
                {/* Specs */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-electric-teal text-sm font-satoshi">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {car.seats}
                  </div>
                  <div className="w-px h-4 bg-electric-teal/20" />
                  <div className="flex items-center gap-1.5 text-electric-teal text-sm font-satoshi">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    {car.luggage}
                  </div>
                </div>

                <div className="inline-block bg-electric-teal/10 border border-electric-teal/20 rounded-full px-4 py-1.5 mb-6">
                  <span className="text-electric-teal text-sm font-semibold font-satoshi">{car.priceRange}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2.5 mb-8">
                {car.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-2.5 text-sm font-satoshi text-white-pearl/70">
                    <div className="w-5 h-5 rounded-full bg-electric-teal/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-electric-teal/20 to-transparent mb-6" />

              {/* CTA Button */}
              <button
                onClick={() => {
                  prefillBooking({ carType: car.type })
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`w-full py-4 text-base font-cabinet font-bold rounded-2xl transition-all duration-300 ${
                  car.highlighted
                    ? 'bg-gradient-to-r from-electric-teal to-bright-teal text-bg-deepest hover:shadow-[0_0_40px_rgba(0,212,200,0.4)] hover:scale-105'
                    : 'border-2 border-electric-teal/30 text-electric-teal hover:bg-electric-teal/10 hover:border-electric-teal/50 hover:scale-105'
                }`}
              >
                Book {car.type}
              </button>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {[
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Fully Insured" },
            { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Verified Drivers" },
            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "On-Time Guarantee" },
            { icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", label: "Sanitized Daily" }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-electric-teal/10 border border-electric-teal/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <p className="text-white-pearl/60 text-sm font-satoshi">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
