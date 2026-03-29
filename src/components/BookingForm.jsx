import { useState, useRef, useEffect } from 'react'
import { contactInfo } from '../data/contact'

export default function BookingForm({ booking, setBooking }) {
  const [errors, setErrors] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  // 3D tilt effect on mouse move
  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return // Disable tilt on mobile
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5
    
    setTilt({ x: rotateX, y: rotateY })
    setCursorPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const validateField = (name, value) => {
    if (name === 'pickup' || name === 'drop') {
      return value.trim().length >= 3 ? '' : `${name === 'pickup' ? 'Pickup' : 'Drop'} location must be at least 3 characters`
    }
    if (name === 'date' || name === 'time') {
      return value ? '' : 'This field is required'
    }
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setBooking(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleCarTypeSelect = (type) => {
    setBooking(prev => ({ ...prev, carType: type }))
  }

  const isValid = booking.pickup.trim().length >= 3 && 
                  booking.drop.trim().length >= 3 && 
                  booking.date && 
                  booking.time && 
                  booking.carType

  const handleSubmit = () => {
    if (!isValid) return

    const formattedDate = new Date(booking.date).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const message = `Hello V3 Tour & Travels!

I'd like to book a ride:

Pickup: ${booking.pickup}
Drop: ${booking.drop}
Date: ${formattedDate}
Time: ${booking.time}
Vehicle: ${booking.carType}

Please confirm availability and price. Thank you!`

    window.open(`https://wa.me/${contactInfo.whatsappRaw}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const carTypes = [
    { value: 'Sedan', emoji: '🚗', name: 'Sedan', sub: '4 seats', desc: 'Economy' },
    { value: 'SUV', emoji: '🚙', name: 'SUV', sub: '6 seats', desc: 'Spacious', popular: true },
    { value: 'Premium', emoji: '🏎', name: 'Premium', sub: '4 seats', desc: 'Luxury' }
  ]

  return (
    <section id="booking" className="relative z-20 -mt-24 px-4 md:px-6 max-w-6xl mx-auto py-12">
      {/* Background glow effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-teal/5 rounded-full blur-[120px]" />
      </div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Glassmorphism card */}
        <div className="relative bg-gradient-to-br from-bg-card/90 to-bg-card/70 backdrop-blur-3xl border border-electric-teal/20 rounded-[32px] shadow-[0_50px_100px_rgba(0,0,0,0.8),0_0_0_1px_rgba(0,212,200,0.1),inset_0_1px_0_rgba(0,212,200,0.1)] p-8 md:p-12 overflow-hidden">
          
          {/* Animated gradient overlay based on cursor */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(0,212,200,0.15), transparent 40%)`
            }}
          />

          {/* Bottom glow */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-electric-teal/10 blur-3xl rounded-full pointer-events-none" />

          {/* Header */}
          <div 
            className={`mb-10 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-electric-teal/10 border border-electric-teal/20 rounded-full px-4 py-1.5 mb-4">
              <div className="w-2 h-2 bg-bright-teal rounded-full animate-pulse" />
              <span className="font-chakra text-[0.65rem] tracking-[0.25em] text-electric-teal uppercase">
                Book Your Ride
              </span>
            </div>
            <h2 className="font-cabinet text-3xl md:text-4xl font-black text-white-pearl leading-tight">
              Where are you<br />
              <span className="text-electric-teal">going today?</span>
            </h2>
            <p className="font-satoshi text-white-pearl/50 mt-3 text-base">
              Instant confirmation via WhatsApp - Professional drivers - Zero hidden charges
            </p>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {/* Pickup Location */}
            <div 
              className={`transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <label className="block font-chakra text-[0.65rem] tracking-[0.2em] uppercase text-white-pearl/50 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Pickup Location
              </label>
              <input
                type="text"
                name="pickup"
                value={booking.pickup}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Ludhiana Railway Station"
                className={`w-full bg-white-pearl/5 border ${
                  errors.pickup ? 'border-coral-error' : booking.pickup.length >= 3 ? 'border-electric-teal/50 bg-electric-teal/5' : 'border-white-pearl/10'
                } hover:border-electric-teal/30 focus:border-electric-teal focus:bg-electric-teal/8 text-white-pearl placeholder-white-pearl/30 rounded-2xl px-5 py-4 text-base font-satoshi outline-none transition-all duration-300 hover:scale-[1.01] focus:scale-[1.02] focus:shadow-[0_0_0_4px_rgba(0,212,200,0.1),0_8px_16px_rgba(0,212,200,0.1)]`}
              />
              {errors.pickup && (
                <p className="text-coral-error text-xs font-satoshi mt-2 animate-slide-in-bottom">{errors.pickup}</p>
              )}
            </div>

            {/* Drop Location */}
            <div 
              className={`transition-all duration-700 delay-250 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <label className="block font-chakra text-[0.65rem] tracking-[0.2em] uppercase text-white-pearl/50 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Drop Location
              </label>
              <input
                type="text"
                name="drop"
                value={booking.drop}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Chandigarh Airport"
                className={`w-full bg-white-pearl/5 border ${
                  errors.drop ? 'border-coral-error' : booking.drop.length >= 3 ? 'border-electric-teal/50 bg-electric-teal/5' : 'border-white-pearl/10'
                } hover:border-electric-teal/30 focus:border-electric-teal focus:bg-electric-teal/8 text-white-pearl placeholder-white-pearl/30 rounded-2xl px-5 py-4 text-base font-satoshi outline-none transition-all duration-300 hover:scale-[1.01] focus:scale-[1.02] focus:shadow-[0_0_0_4px_rgba(0,212,200,0.1),0_8px_16px_rgba(0,212,200,0.1)]`}
              />
              {errors.drop && (
                <p className="text-coral-error text-xs font-satoshi mt-2 animate-slide-in-bottom">{errors.drop}</p>
              )}
            </div>

            {/* Date */}
            <div 
              className={`transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <label className="block font-chakra text-[0.65rem] tracking-[0.2em] uppercase text-white-pearl/50 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Travel Date
              </label>
              <input
                type="date"
                name="date"
                value={booking.date}
                onChange={handleChange}
                onBlur={handleBlur}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full bg-white-pearl/5 border ${
                  booking.date ? 'border-electric-teal/50 bg-electric-teal/5' : 'border-white-pearl/10'
                } hover:border-electric-teal/30 focus:border-electric-teal focus:bg-electric-teal/8 text-white-pearl placeholder-white-pearl/30 rounded-2xl px-5 py-4 text-base font-satoshi outline-none transition-all duration-300 hover:scale-[1.01] focus:scale-[1.02] focus:shadow-[0_0_0_4px_rgba(0,212,200,0.1),0_8px_16px_rgba(0,212,200,0.1)]`}
              />
            </div>

            {/* Time */}
            <div 
              className={`transition-all duration-700 delay-350 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <label className="block font-chakra text-[0.65rem] tracking-[0.2em] uppercase text-white-pearl/50 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pickup Time
              </label>
              <input
                type="time"
                name="time"
                value={booking.time}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-white-pearl/5 border ${
                  booking.time ? 'border-electric-teal/50 bg-electric-teal/5' : 'border-white-pearl/10'
                } hover:border-electric-teal/30 focus:border-electric-teal focus:bg-electric-teal/8 text-white-pearl placeholder-white-pearl/30 rounded-2xl px-5 py-4 text-base font-satoshi outline-none transition-all duration-300 hover:scale-[1.01] focus:scale-[1.02] focus:shadow-[0_0_0_4px_rgba(0,212,200,0.1),0_8px_16px_rgba(0,212,200,0.1)]`}
              />
            </div>
          </div>

          {/* Car Type Selector */}
          <div 
            className={`mb-8 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <label className="block font-chakra text-[0.65rem] tracking-[0.2em] uppercase text-white-pearl/50 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Choose Vehicle
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {carTypes.map((car, index) => (
                <div
                  key={car.value}
                  onClick={() => handleCarTypeSelect(car.value)}
                  className={`relative cursor-pointer rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center transition-all duration-300 group ${
                    booking.carType === car.value
                      ? 'border-2 border-electric-teal bg-electric-teal/10 shadow-[0_0_30px_rgba(0,212,200,0.2),inset_0_0_30px_rgba(0,212,200,0.05)] scale-105'
                      : 'border border-white-pearl/10 bg-white-pearl/3 hover:border-electric-teal/40 hover:bg-electric-teal/5 active:scale-95 sm:hover:scale-105 sm:hover:shadow-[0_8px_24px_rgba(0,212,200,0.1)]'
                  }`}
                  style={{
                    transform: booking.carType === car.value ? 'translateY(-4px)' : '',
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  {car.popular && (
                    <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-electric-teal to-bright-teal text-bg-deepest text-[8px] sm:text-[9px] font-bold font-chakra px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap">
                      Popular
                    </div>
                  )}
                  <div className="text-3xl sm:text-5xl mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-110">{car.emoji}</div>
                  <div className="font-cabinet font-bold text-white-pearl text-sm sm:text-base mb-0.5 sm:mb-1">{car.name}</div>
                  <div className="font-satoshi text-[10px] sm:text-xs text-white-pearl/50">{car.sub}</div>
                  <div className="font-satoshi text-[10px] sm:text-xs text-electric-teal/80 mt-1 sm:mt-2 font-medium">{car.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-electric-teal/20 to-transparent mb-8" />

          {/* Submit Button */}
          <div 
            className={`transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`relative w-full rounded-2xl py-5 text-lg font-bold font-cabinet flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 ${
                isValid
                  ? 'bg-gradient-to-r from-electric-teal to-bright-teal text-bg-deepest hover:shadow-[0_0_50px_rgba(0,212,200,0.5),0_8px_24px_rgba(0,212,200,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer group'
                  : 'bg-white-pearl/5 border border-white-pearl/10 text-white-pearl/30 cursor-not-allowed'
              }`}
            >
              {isValid && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              )}
              <span className="relative z-10 flex items-center gap-3">
                {isValid ? (
                  <>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Book via WhatsApp
                  </>
                ) : (
                  'Fill all details to continue'
                )}
              </span>
            </button>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-white-pearl/40 font-satoshi">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Instant reply
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Price locked
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Cash / UPI
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
