import { useState, useRef, useEffect } from 'react'
import { testimonialsData } from '../data/testimonials'

export default function Testimonials() {
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
    <section ref={sectionRef} id="testimonials" className="py-20 px-4 bg-bg-deepest">
      <div className="max-w-7xl mx-auto">
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="font-chakra text-xs tracking-[0.25em] text-electric-teal uppercase mb-3">CUSTOMER STORIES</div>
          <h2 className="font-cabinet font-extrabold text-white-pearl" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Real People.<br />
            <span className="teal-text">Real Journeys.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonialsData.map((review, i) => (
            <div
              key={review.id}
              className={`bg-bg-card border border-electric-teal/10 rounded-2xl p-7 hover:border-electric-teal/25 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-500 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-teal to-electric-teal flex items-center justify-center text-bg-deepest font-bold text-sm font-cabinet">
                  {review.initials}
                </div>
                <div>
                  <div className="font-cabinet font-bold text-white-pearl text-sm">{review.name}</div>
                  <div className="font-satoshi text-xs text-white-pearl/40">{review.location}</div>
                </div>
              </div>

              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-electric-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="font-satoshi text-sm text-white-pearl/70 leading-relaxed">
                "{review.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
