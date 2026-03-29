import { useState } from 'react'
import EnhancedThreeScene from './EnhancedThreeScene'
import ParticleSystem from './ParticleSystem'
import { contactInfo } from '../data/contact'

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const xRatio = (e.clientX / window.innerWidth - 0.5)
    const yRatio = (e.clientY / window.innerHeight - 0.5)
    setMousePos({ x: xRatio * -18, y: yRatio * -12 })
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi V3! I want to book a ride. ?')
    window.open(`https://wa.me/${contactInfo.whatsappRaw}?text=${message}`, '_blank')
  }

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-screen h-screen overflow-hidden bg-bg-deepest"
      onMouseMove={handleMouseMove}
    >
      {/* Three.js Background with Parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-[800ms] ease-out"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        <EnhancedThreeScene />
      </div>

      {/* Particle System */}
      <ParticleSystem />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-deepest/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-deepest to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-deepest/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-deepest/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pt-20 pb-16">
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 bg-electric-teal/8 border border-electric-teal/20 rounded-full px-5 py-1.5 backdrop-blur-sm animate-fade-in"
          style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}
        >
          <span className="text-electric-teal text-xs font-medium tracking-[0.15em] uppercase font-satoshi">
            ✦  Punjab's #1 Premium Travel Service  ✦
          </span>
        </div>

        {/* Headline */}
        <h1 
          className="mt-8 font-cabinet font-black text-center leading-none tracking-tight animate-slide-in-bottom"
          style={{ 
            fontSize: 'clamp(3.2rem, 7vw, 6.5rem)',
            animationDelay: '400ms',
            opacity: 0,
            animationFillMode: 'forwards',
            filter: 'drop-shadow(0 0 40px rgba(0,212,200,0.2))'
          }}
        >
          <span className="text-white-pearl">Your Journey,</span>
          <br />
          <span className="text-electric-teal italic">Reimagined.</span>
        </h1>

        {/* Tagline */}
        <div 
          className="mt-3 font-chakra text-[0.65rem] tracking-[0.3em] text-electric-teal/55 uppercase animate-fade-in"
          style={{ animationDelay: '600ms', opacity: 0, animationFillMode: 'forwards' }}
        >
          WHERE COMFORT MEETS JOURNEY
        </div>

        {/* Description */}
        <p 
          className="mt-4 font-satoshi text-center text-white-pearl/55 max-w-[500px] leading-relaxed animate-slide-in-bottom"
          style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            animationDelay: '700ms',
            opacity: 0,
            animationFillMode: 'forwards'
          }}
        >
          Premium taxi & outstation travel from Ludhiana. Chandigarh · Delhi · Amritsar · All of Punjab. Professional drivers. Zero hidden charges.
        </p>

        {/* CTA Buttons */}
        <div 
          className="mt-9 flex flex-wrap gap-4 justify-center animate-slide-in-bottom"
          style={{ animationDelay: '800ms', opacity: 0, animationFillMode: 'forwards' }}
        >
          <button
            onClick={scrollToBooking}
            className="relative overflow-hidden bg-electric-teal text-bg-deepest font-bold font-satoshi rounded-full px-9 py-4 text-base hover:bg-bright-teal transition-all duration-300 shadow-[0_0_30px_rgba(0,212,200,0.35)] hover:shadow-[0_0_50px_rgba(0,212,200,0.6)] hover:scale-105 active:scale-95"
          >
            Book a Ride
          </button>
          
          <button
            onClick={handleWhatsApp}
            className="border border-white-pearl/15 hover:border-electric-teal/40 text-white-pearl font-satoshi font-semibold rounded-full px-9 py-4 text-base flex items-center gap-2.5 hover:bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp Us
          </button>
        </div>

        {/* Trust Strip */}
        <div 
          className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 font-satoshi text-xs text-white-pearl/35 animate-fade-in"
          style={{ animationDelay: '1000ms', opacity: 0, animationFillMode: 'forwards' }}
        >
          {['500+ Happy Customers', '24/7 Available', 'Zero Hidden Charges', 'Instant Confirmation'].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <span className="text-electric-teal">✓</span>
              {item}
            </span>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
          <div className="w-6 h-10 border-2 border-electric-teal/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-electric-teal rounded-full animate-bounce" />
          </div>
          <span className="font-chakra text-[0.55rem] tracking-[0.2em] text-electric-teal/30">SCROLL</span>
        </div>
      </div>
    </section>
  )
}
