import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled 
          ? 'bg-bg-deepest/85 backdrop-blur-xl border-b border-electric-teal/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-17">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex items-center gap-2">
                <span className="font-chakra font-semibold text-2xl text-electric-teal">V3</span>
                <span className="font-satoshi text-sm text-white-pearl hidden sm:block">Tour & Travels</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['Services', 'Routes', 'Fleet', 'Why', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative font-satoshi text-sm font-medium text-white-pearl/70 hover:text-electric-teal transition-colors duration-250 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-electric-teal scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection('booking')}
                className="px-6 py-2 border-2 border-electric-teal text-electric-teal rounded-full font-satoshi font-semibold text-sm hover:bg-electric-teal hover:text-bg-deepest transition-all duration-250 hover:shadow-[0_0_20px_rgba(0,212,200,0.4)]"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white-pearl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-bg-deepest/97 backdrop-blur-xl">
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {['Services', 'Routes', 'Fleet', 'Why', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="font-satoshi text-2xl font-medium text-white-pearl hover:text-electric-teal transition-colors"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('booking')}
                className="mt-8 px-10 py-4 bg-electric-teal text-bg-deepest rounded-full font-satoshi font-bold text-lg hover:bg-bright-teal transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
