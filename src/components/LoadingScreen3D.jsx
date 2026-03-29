import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

function AssemblingCar({ progress }) {
  const groupRef = useRef()
  const partsRef = useRef([])

  // Car parts with their final positions
  const parts = [
    { type: 'body', position: [0, 0, 0], scale: [2, 0.6, 0.9], color: '#00D4C8' },
    { type: 'roof', position: [0.2, 0.5, 0], scale: [1.2, 0.4, 0.8], color: '#00D4C8' },
    { type: 'wheel1', position: [-0.7, -0.3, 0.5], scale: [0.3, 0.3, 0.3], color: '#1a1a1a' },
    { type: 'wheel2', position: [0.7, -0.3, 0.5], scale: [0.3, 0.3, 0.3], color: '#1a1a1a' },
    { type: 'wheel3', position: [-0.7, -0.3, -0.5], scale: [0.3, 0.3, 0.3], color: '#1a1a1a' },
    { type: 'wheel4', position: [0.7, -0.3, -0.5], scale: [0.3, 0.3, 0.3], color: '#1a1a1a' },
  ]

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the whole car
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }

    // Animate parts flying in
    partsRef.current.forEach((part, i) => {
      if (part && progress > i * 0.15) {
        const targetPos = new THREE.Vector3(...parts[i].position)
        const startPos = new THREE.Vector3(
          parts[i].position[0] + (Math.random() - 0.5) * 5,
          parts[i].position[1] + 3,
          parts[i].position[2] + (Math.random() - 0.5) * 5
        )
        
        const t = Math.min((progress - i * 0.15) / 0.15, 1)
        const eased = 1 - Math.pow(1 - t, 3) // Ease out cubic
        
        part.position.lerpVectors(startPos, targetPos, eased)
        part.rotation.x = (1 - eased) * Math.PI * 2
        part.rotation.z = (1 - eased) * Math.PI * 2
      }
    })
  })

  return (
    <group ref={groupRef}>
      {parts.map((part, i) => (
        <mesh
          key={i}
          ref={(el) => (partsRef.current[i] = el)}
          castShadow
        >
          <boxGeometry args={part.scale} />
          <meshStandardMaterial
            color={part.color}
            metalness={0.8}
            roughness={0.2}
            emissive={part.color}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Headlights */}
      {progress > 0.7 && (
        <>
          <mesh position={[1, 0, 0.3]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#00D4C8"
              emissiveIntensity={3}
            />
          </mesh>
          <mesh position={[1, 0, -0.3]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#00D4C8"
              emissiveIntensity={3}
            />
          </mesh>
        </>
      )}
    </group>
  )
}

function ProgressRing({ progress }) {
  const ringRef = useRef()

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime
    }
  })

  return (
    <group position={[0, -2, 0]}>
      {/* Background ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshBasicMaterial color="#1a1a2e" transparent opacity={0.3} />
      </mesh>

      {/* Progress ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.08, 16, 100, progress * Math.PI * 2]} />
        <meshStandardMaterial
          color="#00D4C8"
          emissive="#00D4C8"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Particles around ring */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const radius = 1.5
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial
              color="#00D4C8"
              transparent
              opacity={i / 20 < progress ? 1 : 0.2}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function Scene({ progress }) {
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00D4C8" />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#38BDF8" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />

      {/* Assembling car */}
      <AssemblingCar progress={progress} />

      {/* Progress ring */}
      <ProgressRing progress={progress} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0A0D1A" roughness={0.8} metalness={0.2} />
      </mesh>
    </>
  )
}

export default function LoadingScreen3D({ progress = 0 }) {
  return (
    <div className="fixed inset-0 z-50 bg-bg-deepest flex items-center justify-center">
      <div className="w-full h-full">
        <Canvas shadows>
          <Scene progress={progress} />
        </Canvas>
      </div>
      
      {/* Loading text */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
        <div className="font-cabinet font-bold text-white-pearl text-2xl mb-2">
          Loading Your Journey
        </div>
        <div className="font-satoshi text-electric-teal text-sm">
          {Math.round(progress * 100)}%
        </div>
      </div>
    </div>
  )
}
