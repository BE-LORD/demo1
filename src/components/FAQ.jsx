import { useState, useRef, useEffect } from 'react'
import { faqData } from '../data/faq'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
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
    <section ref={sectionRef} id="faq" className="py-20 px-4 bg-bg-deepest">
      <div className="max-w-2xl mx-auto">
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="font-chakra text-xs tracking-[0.25em] text-electric-teal uppercase mb-3">FAQ</div>
          <h2 className="font-cabinet font-extrabold text-white-pearl" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Questions<br />
            <span className="teal-text">Answered.</span>
          </h2>
        </div>

        <div 
          className={`border border-electric-teal/10 rounded-2xl overflow-hidden divide-y divide-electric-teal/6 bg-bg-card transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {faqData.map((faq, i) => (
            <div key={faq.id}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 hover:bg-electric-teal/3 transition-colors group select-none text-left"
              >
                <span className="font-satoshi font-medium text-white-pearl text-sm pr-4">{faq.question}</span>
                <svg
                  className={`w-4 h-4 text-electric-teal transition-transform duration-300 flex-shrink-0 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-350 ease-in-out ${
                  openIndex === i ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 font-satoshi text-sm text-white-pearl/50 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
