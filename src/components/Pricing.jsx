export default function Pricing() {
  const notes = [
    { title: "Dynamic Pricing", desc: "Fare based on route, distance, and vehicle type. Flat rate - not metered." },
    { title: "State Tax Outside Punjab", desc: "Delhi, Haryana, HP may have border taxes - always included in your quote." },
    { title: "Parking Actuals", desc: "Airport parking if any - charged at actuals - always communicated in advance." },
    { title: "Cash / UPI / Transfer", desc: "Multiple payment options. Details shared after booking confirmation." }
  ]

  return (
    <section id="pricing" className="py-20 px-4 bg-bg-deep">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="font-chakra text-xs tracking-[0.25em] text-electric-teal uppercase mb-3">PRICING</div>
          <h2 className="font-cabinet font-extrabold text-white-pearl" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            No Surprises.<br />
            <span className="teal-text">Ever.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <h3 className="font-cabinet font-extrabold text-white-pearl text-3xl mb-4">
              Price confirmed<br />before you ride.
            </h3>
            <p className="font-satoshi text-white-pearl/60 leading-relaxed mb-6">
              We share your full fare on WhatsApp before confirming. What we quote is exactly what you pay. No meter running. No surprise additions.
            </p>
            <button
              onClick={() => window.open('https://wa.me/919888000510?text=' + encodeURIComponent('Hi! I need a price quote for my trip.'), '_blank')}
              className="border-2 border-electric-teal text-electric-teal rounded-full px-8 py-3 font-satoshi font-semibold hover:bg-electric-teal hover:text-bg-deepest transition-all duration-300"
            >
              Get a Free Quote
            </button>
          </div>

          <div className="space-y-4">
            {notes.map((note, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-bg-card border border-electric-teal/10 rounded-2xl hover:border-electric-teal/25 transition-colors">
                <svg className="w-5 h-5 text-electric-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-cabinet font-bold text-white-pearl mb-1">{note.title}</h4>
                  <p className="font-satoshi text-sm text-white-pearl/60">{note.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
