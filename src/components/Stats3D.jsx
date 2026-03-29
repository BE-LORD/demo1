import { Canvas, useFrame } from '@react-three/fiber'
import { Text, PerspectiveCamera } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

function FloatingNumber({ value, label, position, color = '#00D4C8', delay = 0 }) {
  const groupRef = useRef()
  const [displayValue, setDisplayValue] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    
    let current = 0
    const increment = value / 60 // Animate over ~1 second at 60fps
    const interval = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(interval)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(interval)
  }, [started, value])

  useFrame((state) => {
    if (groupRef.current) {
      // Floating animation
      const time = state.clock.elapsedTime + delay
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1
      
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Background glow */}
      <mesh position={[0, 0, -0.1]}>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Number */}
      <Text
        position={[0, 0.1, 0]}
        fontSize={0.4}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/cabinet-grotesk-bold.woff"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {displayValue}+
      </Text>

      {/* Label */}
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.12}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.5}
        textAlign="center"
      >
        {label}
      </Text>

      {/* Orbiting particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 0.6
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle + groupRef.current?.rotation.y || 0) * radius,
              Math.sin(angle * 2) * 0.1,
              Math.sin(angle + groupRef.current?.rotation.y || 0) * radius
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={2}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function Scene() {
  const stats = [
    { value: 500, label: 'Happy Customers', position: [-2.5, 0, 0], color: '#00D4C8', delay: 0 },
    { value: 50, label: 'Cities Covered', position: [0, 0, 0], color: '#38BDF8', delay: 0.2 },
    { value: 24, label: 'Hours Service', position: [2.5, 0, 0], color: '#00D4C8', delay: 0.4 },
  ]

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00D4C8" />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#38BDF8" />
      <pointLight position={[0, -5, 5]} intensity={0.3} color="#00D4C8" />

      {/* Stats */}
      {stats.map((stat, i) => (
        <FloatingNumber key={i} {...stat} />
      ))}

      {/* Background particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4 - 2
          ]}
        >
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial color="#00D4C8" transparent opacity={0.3} />
        </mesh>
      ))}
    </>
  )
}

export default function Stats3D() {
  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-bg-deepest to-bg-deep">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  )
}
