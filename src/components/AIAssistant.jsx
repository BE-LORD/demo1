import { useState } from 'react'
import { contactInfo } from '../data/contact'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'ai', text: "Hi there! I'm your V3 Travel Assistant. I can book a ride for you in under 60 seconds. Ready to go?" }
  ])
  const [input, setInput] = useState('')
  const [state, setState] = useState('idle')
  const [collected, setCollected] = useState({})
  const [isTyping, setIsTyping] = useState(false)

  const quickReplies = {
    idle: ["Yes, let's go!", "Tell me more", "Call instead"],
    collecting_pickup: ["Ludhiana City", "Ludhiana Railway Station", "Ludhiana Bus Stand", "Ludhiana Airport"],
    collecting_drop: ["Chandigarh Airport", "Delhi Airport (IGI)", "Amritsar Airport", "Chandigarh City"],
    collecting_date: ["Today", "Tomorrow", "This Weekend"],
    collecting_time: ["Early Morning (5-7 AM)", "Morning (8-11 AM)", "Afternoon (12-4 PM)", "Evening (5-9 PM)"],
    collecting_car: ["Sedan", "SUV", "Premium"]
  }

  const typewriterEffect = (text, callback) => {
    setIsTyping(true)
    let index = 0
    const chars = text.split('')
    let displayText = ''
    
    const interval = setInterval(() => {
      if (index < chars.length) {
        displayText += chars[index]
        setMessages(prev => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1] = { type: 'ai', text: displayText }
          return newMessages
        })
        index++
      } else {
        clearInterval(interval)
        setIsTyping(false)
        if (callback) callback()
      }
    }, 28)
  }

  const handleSend = (text = input) => {
    if (!text.trim() || isTyping) return

    setMessages(prev => [...prev, { type: 'user', text }])
    setInput('')

    // Add placeholder for AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'ai', text: '' }])
      
      let aiResponse = ''
      let newState = state

      if (state === 'idle') {
        if (text.toLowerCase().includes('yes') || text.toLowerCase().includes('go')) {
          aiResponse = "Great! 🎯 Where should I pick you up from? (City, landmark, or address)"
          newState = 'collecting_pickup'
        } else if (text.toLowerCase().includes('more')) {
          aiResponse = "V3 Tour & Travels offers premium taxi services across Punjab. We provide airport transfers, outstation travel, and local rides with professional drivers. Zero hidden charges! Ready to book?"
          newState = 'idle'
        } else if (text.toLowerCase().includes('call')) {
          aiResponse = "Sure! You can call us at +91 98880 00510. We're available 24/7! 📞"
          newState = 'idle'
        } else {
          aiResponse = "I can help you book a ride quickly! Just say 'Yes' to get started."
          newState = 'idle'
        }
      } else if (state === 'collecting_pickup') {
        setCollected(prev => ({ ...prev, pickup: text }))
        aiResponse = `Got it - picking up from **${text}**.\n\nWhere are you headed?`
        newState = 'collecting_drop'
      } else if (state === 'collecting_drop') {
        setCollected(prev => ({ ...prev, drop: text }))
        aiResponse = `Perfect! **${collected.pickup} → ${text}** it is. 🗺️\n\nWhat date do you need the ride?`
        newState = 'collecting_date'
      } else if (state === 'collecting_date') {
        let date = text
        if (text === 'Today') {
          date = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        } else if (text === 'Tomorrow') {
          const tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          date = tomorrow.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        } else if (text === 'This Weekend') {
          const saturday = new Date()
          const daysUntilSaturday = (6 - saturday.getDay() + 7) % 7
          saturday.setDate(saturday.getDate() + daysUntilSaturday)
          date = saturday.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        }
        setCollected(prev => ({ ...prev, date }))
        aiResponse = `Got the date - **${date}**.\n\nWhat time should I pick you up?`
        newState = 'collecting_time'
      } else if (state === 'collecting_time') {
        let time = text
        if (text.includes('Early Morning')) time = '6:00 AM'
        else if (text.includes('Morning')) time = '9:00 AM'
        else if (text.includes('Afternoon')) time = '2:00 PM'
        else if (text.includes('Evening')) time = '6:00 PM'
        
        setCollected(prev => ({ ...prev, time }))
        aiResponse = "Almost there! Which vehicle type do you prefer?"
        newState = 'collecting_car'
      } else if (state === 'collecting_car') {
        const carType = text.split(' ')[0]
        const finalCollected = { ...collected, carType }
        setCollected(finalCollected)
        
        aiResponse = `Perfect! Here's your booking summary:\n\n📍 From: **${finalCollected.pickup}**\n🏁 To: **${finalCollected.drop}**\n📅 Date: **${finalCollected.date}**\n⏰ Time: **${finalCollected.time}**\n🚘 Vehicle: **${carType}**\n\nShall I send this to V3 on WhatsApp for confirmation?`
        newState = 'confirming'
      } else if (state === 'confirming') {
        if (text.toLowerCase().includes('yes') || text.toLowerCase().includes('send')) {
          aiResponse = `Done! 🎉 Your booking request has been sent to V3 Tour & Travels on WhatsApp. They'll confirm shortly. Have a comfortable journey! ✈️`
          newState = 'sent'
          
          setTimeout(() => {
            const message = `Hello V3 Tour & Travels!\n\nBooking via AI Assistant:\n\nPickup: ${collected.pickup}\nDrop: ${collected.drop}\nDate: ${collected.date}\nTime: ${collected.time}\nVehicle: ${collected.carType}\n\nPlease confirm. Thank you!`
            window.open(`https://wa.me/${contactInfo.whatsappRaw}?text=${encodeURIComponent(message)}`, '_blank')
          }, 1000)
        } else if (text.toLowerCase().includes('edit') || text.toLowerCase().includes('change')) {
          aiResponse = "No problem! Let's start over. Where should I pick you up from?"
          newState = 'collecting_pickup'
          setCollected({})
        } else {
          aiResponse = "Should I send this booking to WhatsApp? Say 'Yes' to confirm or 'Edit' to make changes."
          newState = 'confirming'
        }
      } else if (state === 'sent') {
        if (text.toLowerCase().includes('book') || text.toLowerCase().includes('another')) {
          aiResponse = "Sure! Let's book another ride. Where should I pick you up from?"
          newState = 'collecting_pickup'
          setCollected({})
        } else if (text.toLowerCase().includes('call')) {
          aiResponse = "You can call V3 directly at +91 98880 00510. Available 24/7! 📞"
          newState = 'sent'
        } else {
          aiResponse = "Is there anything else I can help you with? You can book another ride or call V3 directly!"
          newState = 'sent'
        }
      }

      // Handle reset commands
      if (text.toLowerCase() === 'reset' || text.toLowerCase() === 'start over' || text.toLowerCase() === 'cancel') {
        aiResponse = "Okay! Let's start fresh. Ready to book a ride?"
        newState = 'idle'
        setCollected({})
      }

      setState(newState)
      typewriterEffect(aiResponse)
    }, 500)
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-electric-teal rounded-full flex items-center justify-center shadow-lg animate-chat-ring hover:scale-110 transition-transform"
        title="Book with V3 AI"
      >
        <svg className="w-6 h-6 text-bg-deepest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[540px] bg-bg-deep/95 backdrop-blur-2xl border border-electric-teal/18 rounded-2xl shadow-2xl z-50 flex flex-col max-md:inset-x-3 max-md:bottom-20 max-md:w-auto max-md:max-h-[75vh]">
          {/* Header */}
          <div className="bg-electric-teal/6 border-b border-electric-teal/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-wa rounded-full" />
              <span className="font-satoshi font-semibold text-white-pearl text-sm">V3 Travel Assistant</span>
              <span className="font-satoshi text-xs text-white-pearl/40">Online</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white-pearl/60 hover:text-white-pearl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-satoshi leading-relaxed whitespace-pre-line ${
                  msg.type === 'ai' 
                    ? 'bg-electric-teal/8 border border-electric-teal/12 text-white-pearl rounded-tl-sm animate-slide-in-left' 
                    : 'bg-electric-teal text-bg-deepest font-medium rounded-tr-sm animate-slide-in-right'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Quick Replies */}
            {quickReplies[state] && !isTyping && (
              <div className="flex flex-wrap gap-2 mt-2">
                {quickReplies[state].map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(reply)}
                    className="border border-electric-teal/20 text-electric-teal text-xs font-satoshi rounded-full px-3 py-1 hover:bg-electric-teal/10 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-electric-teal/10 px-3 py-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isTyping && handleSend()}
              placeholder="Type your message..."
              disabled={isTyping}
              className="flex-1 bg-white-pearl/5 border border-electric-teal/12 rounded-xl px-3 py-2 text-sm text-white-pearl placeholder-white-pearl/30 outline-none focus:border-electric-teal disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={isTyping}
              className="bg-electric-teal text-bg-deepest rounded-xl px-3 py-2 hover:bg-bright-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
