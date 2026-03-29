import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, PerspectiveCamera } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function FloatingCard() {
  const cardRef = useRef()

  useFrame((state) => {
    if (cardRef.current) {
      // Floating animation
      cardRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      cardRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      cardRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.05
    }
  })

  return (
    <group ref={cardRef}>
      {/* Main card */}
      <RoundedBox args={[3, 4, 0.1]} radius={0.1} smoothness={4} castShadow>
        <meshStandardMaterial
          color="#0A0D1A"
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Glow effect */}
      <RoundedBox args={[3.1, 4.1, 0.05]} radius={0.1} smoothness={4} position={[0, 0, -0.05]}>
        <meshBasicMaterial
          color="#00D4C8"
          transparent
          opacity={0.2}
        />
      </RoundedBox>

      {/* Corner accents */}
      {[
        [-1.4, 1.9, 0.06],
        [1.4, 1.9, 0.06],
        [-1.4, -1.9, 0.06],
        [1.4, -1.9, 0.06]
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color="#00D4C8"
            emissive="#00D4C8"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00D4C8" />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#38BDF8" />
      <spotLight
        position={[0, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />

      {/* Floating card */}
      <FloatingCard />

      {/* Particles around card */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const radius = 2.5
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              -1
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#00D4C8" transparent opacity={0.6} />
          </mesh>
        )
      })}
    </>
  )
}

export default function BookingForm3D() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  )
}
