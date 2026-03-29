import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Stars } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Road() {
  const markingsRef = useRef([])

  useFrame(() => {
    // Animate road markings
    markingsRef.current.forEach((marking) => {
      if (marking) {
        marking.position.z += 0.12
        if (marking.position.z > 5) {
          marking.position.z = -50
        }
      }
    })
  })

  return (
    <group>
      {/* Main road - clean and simple */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -20]} receiveShadow>
        <planeGeometry args={[6, 120]} />
        <meshStandardMaterial 
          color="#05071C" 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>

      {/* Road markings - animated */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (markingsRef.current[i] = el)}
          position={[0, 0.02, -50 + i * 3]}
        >
          <boxGeometry args={[0.08, 0.01, 1]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* LED road edges - subtle teal glow */}
      <mesh position={[-3, 0.02, -20]}>
        <boxGeometry args={[0.02, 0.01, 120]} />
        <meshStandardMaterial
          color="#00D4C8"
          emissive="#00D4C8"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[3, 0.02, -20]}>
        <boxGeometry args={[0.02, 0.01, 120]} />
        <meshStandardMaterial
          color="#00D4C8"
          emissive="#00D4C8"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  )
}

function CityLights() {
  const lightsRef = useRef()

  useFrame((state) => {
    if (lightsRef.current) {
      // Subtle pulsing effect
      const positions = lightsRef.current.geometry.attributes.position.array
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.002
      }
      lightsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  // Create city lights in the distance
  const lightPositions = []
  const lightColors = []
  
  for (let i = 0; i < 80; i++) {
    lightPositions.push(
      (Math.random() - 0.5) * 30,
      Math.random() * 4 + 1,
      -30 - Math.random() * 30
    )
    
    const rand = Math.random()
    if (rand < 0.6) {
      lightColors.push(0, 0.831, 0.784) // Teal
    } else if (rand < 0.85) {
      lightColors.push(0.22, 0.741, 0.969) // Blue
    } else {
      lightColors.push(1, 1, 1) // White
    }
  }

  return (
    <points ref={lightsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={lightPositions.length / 3}
          array={new Float32Array(lightPositions)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={lightColors.length / 3}
          array={new Float32Array(lightColors)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        sizeAttenuation={true}
        vertexColors={true}
        transparent
        opacity={0.8}
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 1.5, 4]} fov={60} />

      {/* Lights - softer and more atmospheric */}
      <ambientLight intensity={0.3} color="#0A1025" />
      <pointLight position={[0, 4, 0]} intensity={1.5} color="#00D4C8" distance={30} decay={2} />
      <pointLight position={[0, 2, -25]} intensity={0.6} color="#38BDF8" distance={50} decay={1.5} />

      {/* Atmospheric fog */}
      <fog attach="fog" args={['#03051A', 8, 60]} />

      {/* Road */}
      <Road />

      {/* City lights in distance */}
      <CityLights />

      {/* Stars - subtle */}
      <Stars
        radius={80}
        depth={60}
        count={200}
        factor={3}
        saturation={0}
        fade
        speed={0.3}
      />
    </>
  )
}

export default function EnhancedThreeScene() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // Only render Three.js on desktop for performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
    setShouldRender(!isMobile)
  }, [])

  // Don't render Three.js on mobile - massive performance improvement
  if (!shouldRender) {
    return (
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-bg-deepest/20 to-bg-deepest/40" />
    )
  }

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
