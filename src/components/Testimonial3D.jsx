import { Canvas, useFrame } from '@react-three/fiber'
import { Text, RoundedBox, PerspectiveCamera } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function SpeechBubble({ position, rotation, text, author, rating, delay = 0 }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      // Floating animation
      const time = state.clock.elapsedTime + delay
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1
      
      // Gentle rotation
      if (hovered) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          rotation[1] + 0.2,
          0.1
        )
        groupRef.current.scale.setScalar(
          THREE.MathUtils.lerp(groupRef.current.scale.x, 1.1, 0.1)
        )
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          rotation[1],
          0.1
        )
        groupRef.current.scale.setScalar(
          THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.1)
        )
      }
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main bubble */}
      <RoundedBox args={[1.5, 1, 0.1]} radius={0.05} smoothness={4} castShadow>
        <meshStandardMaterial
          color="#0A0D1A"
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Bubble tail */}
      <mesh position={[0, -0.55, 0]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[0.1, 0.15, 4]} />
        <meshStandardMaterial
          color="#0A0D1A"
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glow border */}
      <RoundedBox args={[1.52, 1.02, 0.08]} radius={0.05} smoothness={4} position={[0, 0, -0.05]}>
        <meshBasicMaterial
          color="#00D4C8"
          transparent
          opacity={hovered ? 0.4 : 0.2}
        />
      </RoundedBox>

      {/* Stars */}
      {Array.from({ length: rating }).map((_, i) => (
        <mesh key={i} position={[-0.5 + i * 0.25, 0.35, 0.06]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#00D4C8"
            emissive="#00D4C8"
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      {/* Author name */}
      <Text
        position={[0, -0.35, 0.06]}
        fontSize={0.08}
        color="#00D4C8"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
      >
        {author}
      </Text>
    </group>
  )
}

function Scene() {
  const testimonials = [
    { text: "Amazing service!", author: "Rajesh K.", rating: 5, position: [-2, 0, 0], rotation: [0, 0.3, 0], delay: 0 },
    { text: "Very professional", author: "Priya S.", rating: 5, position: [0, 0.5, -1], rotation: [0, 0, 0], delay: 0.5 },
    { text: "Best taxi service", author: "Amit P.", rating: 5, position: [2, 0, 0], rotation: [0, -0.3, 0], delay: 1 },
  ]

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00D4C8" />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#38BDF8" />

      {/* Speech bubbles */}
      {testimonials.map((testimonial, i) => (
        <SpeechBubble key={i} {...testimonial} />
      ))}

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2
        const radius = 3
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle + i) * 0.5,
              Math.sin(angle) * radius - 2
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#00D4C8" transparent opacity={0.4} />
          </mesh>
        )
      })}
    </>
  )
}

export default function Testimonial3D() {
  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-bg-deepest to-bg-deep">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  )
}
