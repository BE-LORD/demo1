import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BookingForm from './components/BookingForm'
import AIAssistant from './components/AIAssistant'
import Services from './components/Services'
import Routes from './components/Routes'
import Fleet from './components/Fleet'
import WhyV3 from './components/WhyV3'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import MobileStickyBar from './components/MobileStickyBar'
import BackToTop from './components/BackToTop'
import CustomCursor from './components/CustomCursor'

function App() {
  const [showLoading, setShowLoading] = useState(true)
  const [booking, setBooking] = useState({
    pickup: '',
    drop: '',
    date: '',
    time: '',
    carType: ''
  })

  useEffect(() => {
    // Check if loading screen has been shown in this session
    const hasLoaded = sessionStorage.getItem('v3_loaded')
    if (hasLoaded) {
      setShowLoading(false)
    }
  }, [])

  const handleLoadingComplete = () => {
    sessionStorage.setItem('v3_loaded', '1')
    setShowLoading(false)
  }

  const prefillBooking = (fields) => {
    setBooking(prev => ({ ...prev, ...fields }))
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }, 120)
  }

  return (
    <>
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div className={showLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-400'}>
        <CustomCursor />
        <Navbar />
        <Hero />
        <BookingForm booking={booking} setBooking={setBooking} />
        <Services prefillBooking={prefillBooking} />
        <Routes prefillBooking={prefillBooking} />
        <Fleet prefillBooking={prefillBooking} />
        <WhyV3 />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Footer />
        <AIAssistant />
        <MobileStickyBar />
        <BackToTop />
      </div>
    </>
  )
}

export default App
