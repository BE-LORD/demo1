import { useState, useRef, useEffect } from 'react'

export default function WhyV3() {
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

  const features = [
    { title: "24/7 Availability", desc: "Book at any hour — midnight or noon. We're always ready." },
    { title: "Verified Drivers", desc: "Background-checked, licensed, and professionally trained." },
    { title: "Sanitized Vehicles", desc: "Cleaned before every single trip. Comfort you can see." },
    { title: "On-Time Every Time", desc: "We track your schedule so you never miss a flight." },
    { title: "Price Locked on WhatsApp", desc: "Full fare confirmed before your trip starts. Always." },
    { title: "60-Second Booking", desc: "One WhatsApp message. Confirmed in minutes." }
  ]

  return (
    <section ref={sectionRef} id="why" className="py-20 px-4 bg-bg-deep diagonal-grid">
      <div className="max-w-7xl mx-auto">
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="font-chakra text-xs tracking-[0.25em] text-electric-teal uppercase mb-3">WHY V3?</div>
          <h2 className="font-cabinet font-extrabold text-white-pearl" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            The Standard Others<br />
            <span className="teal-text">Aim For.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            className={`text-center transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="font-cabinet font-black teal-text mb-8 animate-float" style={{ fontSize: 'clamp(6rem, 15vw, 10rem)' }}>
              V3
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "500+", label: "Happy Customers" },
                { number: "15+", label: "Cities Covered" },
                { number: "24/7", label: "Always On" },
                { number: "Rs 0", label: "Hidden Charges" }
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className={`text-center transition-all duration-700 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <div className="font-chakra font-semibold text-electric-teal" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                    {stat.number}
                  </div>
                  <div className="font-satoshi text-xs text-white-pearl/40 uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className={`flex items-start gap-4 group py-4 border-b border-electric-teal/7 last:border-0 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
                style={{ transitionDelay: `${200 + i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-electric-teal/8 flex items-center justify-center flex-shrink-0 group-hover:bg-electric-teal/15 transition-colors">
                  <svg className="w-5 h-5 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-cabinet font-bold text-white-pearl mb-1">{feature.title}</h3>
                  <p className="font-satoshi text-sm text-white-pearl/60">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
