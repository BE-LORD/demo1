# Design Document

## Overview

The V3 Tour & Travels Premium Travel Booking Platform is a futuristic web application built with React, Three.js, and Tailwind CSS. The platform delivers a world-class user experience combining deep space luxury aesthetics with seamless booking functionality for premium taxi and outstation travel services in Punjab, India.

### Design Philosophy

The platform embodies three core design principles:

1. **Futuristic Luxury**: Deep Space Navy (#03051A) and Electric Teal (#00D4C8) color palette creates a premium, cutting-edge aesthetic that differentiates V3 from traditional taxi booking services.

2. **Immersive Experience**: Advanced 3D visualizations using Three.js, particle systems, and parallax effects create an engaging, memorable first impression that communicates technological sophistication.

3. **Conversion-Optimized**: Multiple booking pathways (traditional form, AI assistant, quick CTAs) with WhatsApp integration ensure users can complete bookings through their preferred method with minimal friction.

### Technology Stack

- **Frontend Framework**: React 18.2.0 with functional components and hooks
- **Build Tool**: Vite 5.0.12 for fast development and optimized production builds
- **Styling**: Tailwind CSS 3.4.1 with custom design tokens and utility classes
- **3D Graphics**: Three.js 0.160.0 for WebGL-based highway scene rendering
- **Particle Effects**: tsParticles (to be integrated) for ambient animations
- **State Management**: React useState and useEffect hooks for local component state
- **Routing**: Single-page application with smooth scroll navigation
- **Deployment Target**: Static hosting (Vercel, Netlify, or similar)

### Key Features

- **Loading Screen Animation**: Full-screen intro with speed line, text reveal, and progress bar
- **3D Highway Scene**: Night highway visualization with animated lane markings, city skyline, and stars
- **Particle System Overlay**: Ambient particle effects with mouse interaction
- **Mouse Parallax**: Subtle 3D scene movement responding to cursor position
- **Glassmorphism Booking Form**: Transparent card with backdrop blur and validation
- **AI Assistant Chatbot**: Conversational booking flow with natural language interaction
- **Vehicle Type Selector**: Visual selection of Sedan, SUV, or Premium vehicles
- **WhatsApp Integration**: All booking requests routed to WhatsApp for instant confirmation
- **Responsive Navigation**: Adaptive navbar with mobile hamburger menu
- **Content Sections**: Services, routes, fleet, testimonials, FAQ, pricing
- **Mobile Sticky Bar**: Fixed bottom bar with call and WhatsApp buttons on mobile
- **Scroll Animations**: Intersection Observer-based animations for engaging content reveal

## Architecture

### Component Hierarchy

```
App
├── LoadingScreen
├── CustomCursor
├── Navbar
├── Hero
│   ├── ThreeScene
│   └── ParticleSystem (tsParticles)
├── BookingForm
│   └── VehicleTypeSelector
├── Services
│   └── ServiceCard[]
├── Routes
│   └── RouteCard[]
├── Fleet
│   └── FleetCard[]
├── WhyV3
│   └── StatCounter[]
├── Testimonials
│   └── TestimonialCard[]
├── Pricing
│   └── PricingCard[]
├── FAQ
│   └── FAQItem[]
├── FinalCTA
├── Footer
├── AIAssistant
│   ├── ChatMessage[]
│   └── QuickReplyChip[]
├── MobileStickyBar
└── BackToTop
```

### State Management Strategy

The application uses React's built-in state management with the following approach:

1. **App-Level State**: Booking form data (`booking` object) is lifted to App component and passed down to BookingForm and AIAssistant components. This allows pre-filling the form from route/fleet selections.

2. **Component-Local State**: Each component manages its own UI state (open/closed, hover, validation errors, etc.) using useState hooks.

3. **Session Storage**: Loading screen display flag is stored in sessionStorage to prevent showing the animation on subsequent page visits within the same session.

4. **No Global State Library**: The application's state requirements are simple enough that Redux, Zustand, or Context API are not necessary. Props drilling is minimal due to shallow component tree.

### Data Flow

```
User Interaction → Component State Update → UI Re-render
                                          ↓
                                    WhatsApp URL Generation
                                          ↓
                                    External Navigation
```

For booking flow:
1. User fills form or interacts with AI assistant
2. State updates in real-time with validation
3. On submit, data is formatted into WhatsApp message
4. WhatsApp URL is opened in new tab
5. No server-side persistence required

### Routing Strategy

Single-page application with hash-based section navigation:
- No React Router required
- Smooth scroll to sections using `scrollIntoView()`
- URL hash updates for deep linking (optional enhancement)
- Back-to-top button for quick navigation

## Components and Interfaces

### Core Components

#### LoadingScreen

**Purpose**: Display full-screen intro animation on first visit

**Props**: 
- `onComplete: () => void` - Callback fired when animation completes

**State**:
- None (animation driven by CSS and setTimeout)

**Behavior**:
1. Renders full-screen overlay with Deep Space Navy background
2. Animates teal speed line sweep (400ms)
3. Reveals "V3 TOUR & TRAVELS" text character-by-character (55ms stagger)
4. Displays progress bar filling 0-100% (2000ms)
5. Shows tagline fade-in at 1200ms
6. Fades out entire screen at 2400ms (400ms transition)
7. Calls `onComplete` callback
8. Parent component sets sessionStorage flag and hides LoadingScreen

**Styling**:
- Fixed position, z-index 9999
- Background: #03051A
- Text: "V3" in #00D4C8, rest in #EEF4FF
- Font: Chakra Petch for main text
- Animations: CSS keyframes for speed line, text reveal, progress bar

#### Navbar

**Purpose**: Persistent navigation bar with scroll-based styling

**Props**: None

**State**:
- `scrolled: boolean` - Whether user has scrolled past 60px
- `mobileMenuOpen: boolean` - Mobile menu visibility

**Behavior**:
1. Listens to scroll events to update `scrolled` state
2. Applies backdrop blur and background when scrolled
3. Renders logo, nav links, and "Book Now" CTA
4. On mobile, shows hamburger icon that opens full-screen menu
5. Nav links smooth scroll to corresponding sections
6. "Book Now" button scrolls to booking form

**Styling**:
- Fixed position, top 0, z-index 1000
- Height: 68px desktop, 60px mobile
- Transparent when not scrolled, blurred background when scrolled
- Transition: 400ms ease for background changes
- Mobile menu: full-screen overlay with slide-in animation

**Accessibility**:
- Semantic `<nav>` element
- ARIA labels for hamburger button
- Keyboard navigation support
- Focus indicators on all links

#### Hero

**Purpose**: Main landing section with 3D scene, particles, and headline content

**Props**: None

**State**:
- `mousePosition: { x: number, y: number }` - For parallax effect

**Behavior**:
1. Renders ThreeScene component for 3D highway
2. Renders ParticleSystem overlay
3. Tracks mouse movement for parallax effect
4. Displays headline, tagline, description, CTAs, and trust indicators
5. "Book a Ride" button scrolls to booking form
6. "WhatsApp Us" button opens WhatsApp with greeting message
7. Animated scroll indicator at bottom

**Styling**:
- Relative positioning for layering
- Min-height: 100vh
- Background: Deep Space Navy with gradient
- Parallax: CSS transform on ThreeScene based on mouse position
- Typography: Cabinet Grotesk for headline, clamp sizing
- Animations: Stagger fade-in for content elements

**Composition**:
- Contains ThreeScene and ParticleSystem as child components
- Layered with z-index: ThreeScene (1), ParticleSystem (2), Content (3)

#### ThreeScene

**Purpose**: Render 3D night highway visualization using Three.js

**Props**: None

**State**:
- `scene: THREE.Scene` - Three.js scene object
- `camera: THREE.PerspectiveCamera` - Camera with 60° FOV
- `renderer: THREE.WebGLRenderer` - WebGL renderer
- `animationFrameId: number` - For cleanup

**Behavior**:
1. Initializes Three.js scene, camera, renderer on mount
2. Creates road plane with animated lane markings (16 boxes)
3. Renders city skyline points (140) with sine wave animation
4. Renders star field (350 points) in sphere distribution
5. Adds teal LED road edge strips with emissive glow
6. Adds headlight beam cones at camera origin
7. Applies exponential fog for depth
8. Animates lane markings moving toward viewer (Z-axis translation)
9. Resets lane marking position when Z > 2.5 to Z = -45
10. Handles window resize to update camera and renderer
11. Cleans up geometries, materials, and animation frames on unmount

**Styling**:
- Canvas fills container
- Pixel ratio: min(devicePixelRatio, 2) for performance
- Background: transparent (inherits from Hero)

**Performance**:
- Pauses animation when document hidden
- Disposes resources on cleanup
- Limits pixel ratio to 2
- Uses BufferGeometry for efficiency

**Technical Details**:
- Camera position: (0, 1.4, 3.5)
- Fog: exponential density 0.012
- Lane marking speed: 0.09 units/frame
- Lighting: ambient + 2 point lights (teal, blue)

#### BookingForm

**Purpose**: Glassmorphism card for collecting travel details with validation

**Props**:
- `booking: BookingState` - Current form values
- `setBooking: (booking: BookingState) => void` - State setter

**State**:
- `errors: { [field: string]: string }` - Validation error messages
- `touched: { [field: string]: boolean }` - Fields that have been blurred

**Behavior**:
1. Renders 5 input fields: pickup, drop, date, time, vehicle type
2. Validates pickup and drop require minimum 3 characters
3. Validates all fields are filled before enabling submit
4. Displays error messages below invalid fields when blurred
5. Applies teal border to valid fields, red border to invalid
6. On submit, constructs WhatsApp message with formatted data
7. Opens WhatsApp URL in new tab
8. Triggers particle burst animation from button

**Styling**:
- Position: relative with -80px top margin (overlaps Hero)
- Background: rgba(10,15,46,0.85) with backdrop-filter blur(40px)
- Border: 1px solid rgba(0,212,200,0.15)
- Border-radius: 24px
- Padding: responsive (32px desktop, 24px mobile)
- Box-shadow: teal glow

**Validation Rules**:
- Pickup location: min 3 characters
- Drop location: min 3 characters
- Date: required, min value = today
- Time: required
- Vehicle type: required (one of Sedan, SUV, Premium)

**WhatsApp Message Format**:
```
Hello V3 Tour & Travels! 🚗

I'd like to book a ride:

📍 Pickup: {pickup}
🏁 Drop: {drop}
📅 Date: {formatted_date}
⏰ Time: {time}
🚘 Vehicle: {carType}

Please confirm availability and price. Thank you!
```

#### AIAssistant

**Purpose**: Conversational chatbot for guided booking flow

**Props**: None

**State**:
- `isOpen: boolean` - Chat panel visibility
- `messages: Message[]` - Conversation history
- `conversationState: ConversationState` - Current step in flow
- `bookingData: Partial<BookingState>` - Collected booking details
- `inputValue: string` - Current user input

**Behavior**:
1. Floating trigger button at bottom-right with pulse animation
2. Opens chat panel on trigger click
3. Displays welcome message with quick reply chips
4. Guides user through 5-step booking flow:
   - collecting_pickup: Ask for pickup location
   - collecting_drop: Ask for drop location
   - collecting_date: Ask for travel date
   - collecting_time: Ask for pickup time
   - collecting_car: Ask for vehicle type
   - confirming: Show summary and confirm
   - sent: Success message after WhatsApp opens
5. Provides quick reply chips for common responses
6. Stores collected data in component state
7. On confirmation, constructs WhatsApp message and opens URL
8. Supports "reset", "start over", "cancel" commands
9. Renders AI messages with typewriter effect (28ms/char)

**Styling**:
- Trigger button: 56px circle, Electric Teal background, fixed bottom-right
- Chat panel: 380x540px desktop, 75vh mobile
- Background: rgba(6,9,30,0.95) with backdrop blur
- Messages: AI on left (teal), user on right (solid teal)
- Animations: fade-in, slide-in for messages
- Custom teal scrollbar

**Conversation Flow**:
```
idle → collecting_pickup → collecting_drop → collecting_date 
     → collecting_time → collecting_car → confirming → sent
```

**Quick Reply Examples**:
- Locations: "Ludhiana City", "Ludhiana Railway Station", "Chandigarh Airport"
- Dates: "Today", "Tomorrow", "This Weekend", "Choose Date"
- Times: "Early Morning (5-7 AM)", "Morning (8-11 AM)", "Afternoon (12-4 PM)"
- Vehicles: Cards with emoji, label, subtitle

#### Services

**Purpose**: Display available travel services with interactive cards

**Props**:
- `prefillBooking: (fields: Partial<BookingState>) => void` - Callback to pre-fill form

**State**: None (stateless presentation)

**Behavior**:
1. Renders 6 ServiceCard components in responsive grid
2. Each card has icon, title, description, badge (optional), CTA
3. On CTA click, scrolls to booking form or opens AI assistant
4. Cards animate on scroll with stagger effect
5. 3D tilt effect on mouse hover

**Services Data**:
- One-Way Trip: "Most Popular" badge
- Round Trip: "Best Value" badge
- Airport Transfer
- Local Rides
- Outstation Travel
- Corporate Travel

**Styling**:
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Cards: background #0A0F2E, border rgba(0,212,200,0.1)
- Tilt: perspective 800px, max rotation ±10°
- Animations: fade-in, slide-up on scroll

#### Routes

**Purpose**: Display popular travel routes with distance and duration

**Props**:
- `prefillBooking: (fields: Partial<BookingState>) => void` - Callback to pre-fill form

**State**: None

**Behavior**:
1. Renders RouteCard components for popular routes
2. Each card shows origin, destination, distance, duration
3. Animated SVG arrow between cities
4. On CTA click, pre-fills booking form with route cities and scrolls
5. Horizontal scroll with snap on mobile

**Routes Data**:
- Ludhiana → Chandigarh (95 km, 2h 15m)
- Ludhiana → Delhi Airport (320 km, 5h 30m)
- Ludhiana → Amritsar (140 km, 3h)
- Chandigarh → Delhi (250 km, 4h 30m)
- And more...

**Styling**:
- Glassmorphism cards with teal border
- SVG arrow with stroke-dashoffset animation
- Distance/duration chips in Chakra Petch font
- Hover: border opacity increase, subtle scale

#### Fleet

**Purpose**: Display available vehicle types with features

**Props**:
- `prefillBooking: (fields: Partial<BookingState>) => void` - Callback to pre-fill form

**State**: None

**Behavior**:
1. Renders 3 FleetCard components for vehicle types
2. Each card shows emoji, name, capacity, category, models, features
3. "Most Popular" badge on SUV card
4. 3D tilt effect on hover
5. On CTA click, pre-selects vehicle type in booking form and scrolls

**Fleet Data**:
- Sedan: 🚗, 4 seats, Economy, "Dzire, Amaze"
- SUV: 🚙, 6 seats, Spacious, "Ertiga, Innova" (Most Popular)
- Premium: ⭐, 4 seats, Luxury, "Ciaz, City"

**Styling**:
- Cards: dark background, teal border
- Vehicle emoji: large size with teal glow
- Feature tags: small pills with teal accent
- Tilt: perspective transform on hover

### Utility Components

#### MobileStickyBar

**Purpose**: Fixed bottom bar with call and WhatsApp buttons on mobile

**Props**: None

**State**:
- `visible: boolean` - Show after scrolling 200px

**Behavior**:
1. Only renders on viewports < 768px
2. Appears after user scrolls 200px
3. Displays "Call Now" and "WhatsApp" buttons
4. Call button initiates tel: link
5. WhatsApp button opens WhatsApp URL
6. Slide-up animation on appear

**Styling**:
- Fixed bottom, full width, z-index 999
- Glassmorphism background with backdrop blur
- Safe area insets for notched devices
- Buttons: 44px min height for touch targets

#### BackToTop

**Purpose**: Button to scroll back to top of page

**Props**: None

**State**:
- `visible: boolean` - Show when scrolled > 500px

**Behavior**:
1. Appears when scroll position exceeds 500px
2. On click, smooth scrolls to top
3. Fade-in and slide-up animation
4. Positioned above MobileStickyBar on mobile

**Styling**:
- Fixed bottom-right, 48px circle
- Electric Teal background with glow
- Upward arrow icon
- Hover: scale 1.1

#### CustomCursor

**Purpose**: Custom cursor design for desktop (optional enhancement)

**Props**: None

**State**:
- `position: { x: number, y: number }` - Cursor position

**Behavior**:
1. Tracks mouse movement
2. Renders custom cursor element
3. Hides default cursor
4. Only active on desktop (pointer: fine)

**Styling**:
- Small teal circle following cursor
- Larger ring with delay for trail effect
- Blend mode for visual interest

### Content Components

#### Testimonials

**Purpose**: Display customer reviews

**Props**: None

**State**: None

**Behavior**:
1. Renders 5 testimonial cards in grid
2. Each card shows avatar, name, location, rating, review
3. Stagger animation on scroll
4. Auto-scroll carousel on mobile (optional)

**Data Structure**:
```typescript
{
  name: string
  location: string
  rating: 1-5
  review: string
  initials: string
}
```

#### FAQ

**Purpose**: Accordion-style frequently asked questions

**Props**: None

**State**:
- `openIndex: number | null` - Currently expanded FAQ

**Behavior**:
1. Renders 8 FAQ items
2. Only one item expanded at a time
3. Click to expand/collapse with smooth animation
4. Chevron icon rotates on expand

**Styling**:
- Questions: Cabinet Grotesk, medium weight
- Answers: Satoshi, comfortable line-height
- Expanded: teal accent color
- Animation: max-height transition

#### Pricing

**Purpose**: Display pricing transparency principles

**Props**: None

**State**: None

**Behavior**:
1. Renders 4 pricing cards
2. Each card shows icon and principle
3. Fade-in animation on scroll

**Principles**:
- No Hidden Charges
- Pay After Ride
- Toll & Parking Extra
- Flexible Cancellation

#### Footer

**Purpose**: Site footer with links and contact info

**Props**: None

**State**: None

**Behavior**:
1. 4-column layout: Company, Services, Quick Links, Contact
2. Renders logo and tagline
3. Service and quick links
4. Contact info with clickable tel: and mailto: links
5. Copyright text
6. Stacks vertically on mobile

**Styling**:
- Dark background with subtle top border
- Links: hover changes to teal
- Responsive: 4 columns → 2 columns → 1 column

## Data Models

### BookingState

```typescript
interface BookingState {
  pickup: string        // Pickup location (min 3 chars)
  drop: string          // Drop location (min 3 chars)
  date: string          // Travel date (YYYY-MM-DD format)
  time: string          // Pickup time (HH:MM format)
  carType: CarType      // Selected vehicle type
}
```

### CarType

```typescript
type CarType = 'Sedan' | 'SUV' | 'Premium' | ''
```

### Message (AI Assistant)

```typescript
interface Message {
  id: string
  role: 'ai' | 'user'
  content: string
  timestamp: Date
  quickReplies?: QuickReply[]
}
```

### QuickReply

```typescript
interface QuickReply {
  label: string
  value: string
  type?: 'text' | 'date' | 'vehicle'
}
```

### ConversationState

```typescript
type ConversationState = 
  | 'idle'
  | 'collecting_pickup'
  | 'collecting_drop'
  | 'collecting_date'
  | 'collecting_time'
  | 'collecting_car'
  | 'confirming'
  | 'sent'
```

### ServiceData

```typescript
interface ServiceData {
  id: string
  icon: React.ReactNode  // SVG component
  title: string
  description: string
  badge?: string         // "Most Popular", "Best Value", etc.
}
```

### RouteData

```typescript
interface RouteData {
  id: string
  origin: string
  destination: string
  distance: string       // e.g., "95 km"
  duration: string       // e.g., "2h 15m"
}
```

### FleetData

```typescript
interface FleetData {
  id: string
  emoji: string
  name: string
  capacity: string       // e.g., "4 seats"
  category: string       // "Economy", "Spacious", "Luxury"
  models: string         // e.g., "Dzire, Amaze"
  features: string[]     // ["AC", "Comfortable", "GPS"]
  badge?: string         // "Most Popular"
  carType: CarType
}
```

### TestimonialData

```typescript
interface TestimonialData {
  id: string
  name: string
  location: string
  rating: number         // 1-5
  review: string
  initials: string       // For avatar
}
```

### FAQData

```typescript
interface FAQData {
  id: string
  question: string
  answer: string
}
```

