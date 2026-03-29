import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Text, Line } from '@react-three/drei'
import { Suspense, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'

// City marker component
function CityMarker({ position, name, color = '#00D4C8', isHighlighted = false }) {
  const markerRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (markerRef.current) {
      // Pulse animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      markerRef.current.scale.setScalar(hovered ? scale * 1.2 : scale)
    }
  })

  return (
    <group position={position}>
      {/* Marker pin */}
      <group
        ref={markerRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Pin body */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 2 : 1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Pin point */}
        <mesh position={[0, 0.2, 0]}>
          <coneGeometry args={[0.1, 0.3, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 2 : 1}
          />
        </mesh>

        {/* Glow ring */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 0.3, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={hovered ? 0.5 : 0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* City name label */}
      <Text
        position={[0, 1, 0]}
        fontSize={0.2}
        color={hovered ? '#FFFFFF' : color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {name}
      </Text>
    </group>
  )
}

// Animated route line
function AnimatedRoute({ start, end, color = '#00D4C8' }) {
  const particleRef = useRef()

  useFrame((state) => {
    if (particleRef.current) {
      // Animate particle along the route
      const t = (Math.sin(state.clock.elapsedTime * 0.5) + 1) / 2
      particleRef.current.position.lerpVectors(
        new THREE.Vector3(...start),
        new THREE.Vector3(...end),
        t
      )
    }
  })

  const points = useMemo(() => {
    // Create curved path between cities
    const startVec = new THREE.Vector3(...start)
    const endVec = new THREE.Vector3(...end)
    const midPoint = new THREE.Vector3().lerpVectors(startVec, endVec, 0.5)
    midPoint.y += 0.5 // Arc height
    
    const curve = new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec)
    return curve.getPoints(50)
  }, [start, end])

  return (
    <group>
      {/* Route line */}
      <Line
        points={points}
        color={color}
        lineWidth={2}
        transparent
        opacity={0.6}
      />

      {/* Animated particle (car) */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  )
}

// Main map scene
function MapScene({ routes }) {
  // All cities with positions
  const cities = {
    ludhiana: { position: [0, 0, 0], name: 'Ludhiana', color: '#00D4C8' },
    chandigarh: { position: [-2, 0, -2], name: 'Chandigarh', color: '#00D4C8' },
    delhi: { position: [3, 0, 1], name: 'Delhi', color: '#38BDF8' },
    amritsar: { position: [-3, 0, 1], name: 'Amritsar', color: '#00D4C8' },
    shimla: { position: [-1, 0, -3.5], name: 'Shimla', color: '#38BDF8' },
    manali: { position: [-2.5, 0, -4], name: 'Manali', color: '#38BDF8' }
  }

  // Map all routes
  const routeConnections = [
    { start: 'ludhiana', end: 'chandigarh', color: '#00D4C8' },
    { start: 'ludhiana', end: 'delhi', color: '#38BDF8' },
    { start: 'ludhiana', end: 'amritsar', color: '#00D4C8' },
    { start: 'chandigarh', end: 'delhi', color: '#38BDF8' },
    { start: 'ludhiana', end: 'shimla', color: '#38BDF8' },
    { start: 'ludhiana', end: 'manali', color: '#00D4C8' }
  ]

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 5, 6]} fov={50} />

      {/* Lights */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00D4C8" />
      <pointLight position={[-5, 5, -5]} intensity={0.8} color="#38BDF8" />

      {/* Ground plane - clean dark surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial
          color="#03051A"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* City markers */}
      {Object.entries(cities).map(([key, city]) => (
        <CityMarker
          key={key}
          position={city.position}
          name={city.name}
          color={city.color}
          isHighlighted={key === 'ludhiana'}
        />
      ))}

      {/* Routes */}
      {routeConnections.map((route, i) => (
        <AnimatedRoute
          key={i}
          start={cities[route.start].position}
          end={cities[route.end].position}
          color={route.color}
        />
      ))}

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={12}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.8}
      />
    </>
  )
}

export default function RouteMap3D({ routes = [] }) {
  return (
    <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-bg-deepest to-bg-deep">
      <Canvas shadows>
        <Suspense fallback={null}>
          <MapScene routes={routes} />
        </Suspense>
      </Canvas>
      
      {/* Interaction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white-pearl/70 text-xs font-satoshi px-4 py-2 rounded-full border border-electric-teal/20">
        🖱️ Drag to rotate • Scroll to zoom • Watch the animated routes
      </div>
    </div>
  )
}
