import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Enhanced 3D Car Component with realistic procedural geometry
export function Car3D({ type = 'sedan', color = '#00D4C8', ...props }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      // Auto-rotate slowly
      groupRef.current.rotation.y += 0.005
      
      // Hover effect - slight bounce
      if (hovered) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 0.1
      } else {
        groupRef.current.position.y = THREE.MathUtils.lerp(
          groupRef.current.position.y,
          0,
          0.1
        )
      }
    }
  })

  // Car dimensions based on type
  const dimensions = {
    sedan: { length: 2.2, width: 1.0, height: 0.65, wheelBase: 1.4 },
    suv: { length: 2.6, width: 1.2, height: 1.0, wheelBase: 1.7 },
    premium: { length: 2.8, width: 1.1, height: 0.75, wheelBase: 1.8 }
  }

  const dim = dimensions[type] || dimensions.sedan

  return (
    <group 
      ref={groupRef} 
      {...props}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main Car Body - Lower Section */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[dim.length, dim.height * 0.7, dim.width]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Car Hood - Slightly raised */}
      <mesh position={[dim.length * 0.25, 0.35 + dim.height * 0.4, 0]} castShadow>
        <boxGeometry args={[dim.length * 0.4, dim.height * 0.15, dim.width * 0.95]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Car Trunk */}
      <mesh position={[-dim.length * 0.25, 0.35 + dim.height * 0.35, 0]} castShadow>
        <boxGeometry args={[dim.length * 0.4, dim.height * 0.12, dim.width * 0.95]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Car Cabin/Roof */}
      <mesh position={[0.05, 0.35 + dim.height * 0.5 + 0.25, 0]} castShadow>
        <boxGeometry args={[dim.length * 0.55, 0.45, dim.width * 0.85]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Front Windshield */}
      <mesh position={[dim.length * 0.28, 0.35 + dim.height * 0.5 + 0.25, 0]} castShadow>
        <boxGeometry args={[0.08, 0.4, dim.width * 0.8]} />
        <meshStandardMaterial 
          color="#0a0a1a"
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.25}
          envMapIntensity={2}
        />
      </mesh>

      {/* Rear Windshield */}
      <mesh position={[-dim.length * 0.22, 0.35 + dim.height * 0.5 + 0.25, 0]} castShadow>
        <boxGeometry args={[0.08, 0.38, dim.width * 0.8]} />
        <meshStandardMaterial 
          color="#0a0a1a"
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.25}
          envMapIntensity={2}
        />
      </mesh>

      {/* Side Windows - Left */}
      <mesh position={[0.1, 0.35 + dim.height * 0.5 + 0.25, dim.width * 0.43]} castShadow>
        <boxGeometry args={[dim.length * 0.45, 0.35, 0.02]} />
        <meshStandardMaterial 
          color="#0a0a1a"
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.2}
          envMapIntensity={2}
        />
      </mesh>

      {/* Side Windows - Right */}
      <mesh position={[0.1, 0.35 + dim.height * 0.5 + 0.25, -dim.width * 0.43]} castShadow>
        <boxGeometry args={[dim.length * 0.45, 0.35, 0.02]} />
        <meshStandardMaterial 
          color="#0a0a1a"
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.2}
          envMapIntensity={2}
        />
      </mesh>

      {/* Front Bumper */}
      <mesh position={[dim.length * 0.48, 0.15, 0]} castShadow>
        <boxGeometry args={[0.08, 0.2, dim.width * 0.9]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Rear Bumper */}
      <mesh position={[-dim.length * 0.48, 0.15, 0]} castShadow>
        <boxGeometry args={[0.08, 0.2, dim.width * 0.9]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Front Grille */}
      <mesh position={[dim.length * 0.51, 0.3, 0]}>
        <boxGeometry args={[0.02, 0.15, dim.width * 0.6]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Wheels with better positioning */}
      {[
        [-dim.wheelBase * 0.5, 0.15, dim.width * 0.48],
        [dim.wheelBase * 0.5, 0.15, dim.width * 0.48],
        [-dim.wheelBase * 0.5, 0.15, -dim.width * 0.48],
        [dim.wheelBase * 0.5, 0.15, -dim.width * 0.48]
      ].map((pos, i) => (
        <group key={i} position={pos}>
          {/* Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.18, 24]} />
            <meshStandardMaterial 
              color="#0a0a0a" 
              metalness={0.3} 
              roughness={0.8}
            />
          </mesh>
          {/* Rim - Outer */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.19, 24]} />
            <meshStandardMaterial 
              color="#c0c0c0" 
              metalness={0.95} 
              roughness={0.05}
              envMapIntensity={2}
            />
          </mesh>
          {/* Rim - Center Hub */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
            <meshStandardMaterial 
              color="#808080" 
              metalness={0.9} 
              roughness={0.1}
            />
          </mesh>
          {/* Brake Disc */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.02, 24]} />
            <meshStandardMaterial 
              color="#404040" 
              metalness={0.8} 
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Headlights - Modern LED style */}
      <group position={[dim.length * 0.5, 0.35, 0]}>
        {/* Left Headlight */}
        <mesh position={[0, 0, dim.width * 0.35]}>
          <boxGeometry args={[0.05, 0.12, 0.2]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive={color}
            emissiveIntensity={2.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Right Headlight */}
        <mesh position={[0, 0, -dim.width * 0.35]}>
          <boxGeometry args={[0.05, 0.12, 0.2]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive={color}
            emissiveIntensity={2.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* DRL (Daytime Running Lights) */}
        <mesh position={[0.01, -0.08, dim.width * 0.35]}>
          <boxGeometry args={[0.03, 0.02, 0.15]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#00D4C8"
            emissiveIntensity={1.5}
          />
        </mesh>
        <mesh position={[0.01, -0.08, -dim.width * 0.35]}>
          <boxGeometry args={[0.03, 0.02, 0.15]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#00D4C8"
            emissiveIntensity={1.5}
          />
        </mesh>
      </group>

      {/* Taillights - Modern LED style */}
      <group position={[-dim.length * 0.5, 0.35, 0]}>
        {/* Left Taillight */}
        <mesh position={[0, 0, dim.width * 0.38]}>
          <boxGeometry args={[0.04, 0.15, 0.18]} />
          <meshStandardMaterial 
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={1.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Right Taillight */}
        <mesh position={[0, 0, -dim.width * 0.38]}>
          <boxGeometry args={[0.04, 0.15, 0.18]} />
          <meshStandardMaterial 
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={1.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Brake Lights */}
        <mesh position={[0, 0.1, dim.width * 0.38]}>
          <boxGeometry args={[0.03, 0.04, 0.12]} />
          <meshStandardMaterial 
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh position={[0, 0.1, -dim.width * 0.38]}>
          <boxGeometry args={[0.03, 0.04, 0.12]} />
          <meshStandardMaterial 
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Side Mirrors */}
      <mesh position={[dim.length * 0.15, 0.35 + dim.height * 0.5 + 0.15, dim.width * 0.52]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.12]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <mesh position={[dim.length * 0.15, 0.35 + dim.height * 0.5 + 0.15, -dim.width * 0.52]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.12]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Door Handles */}
      {[-0.15, 0.15].map((xPos, i) => (
        <group key={`handles-${i}`}>
          <mesh position={[xPos, 0.5, dim.width * 0.51]}>
            <boxGeometry args={[0.12, 0.03, 0.02]} />
            <meshStandardMaterial 
              color="#c0c0c0"
              metalness={0.95}
              roughness={0.05}
            />
          </mesh>
          <mesh position={[xPos, 0.5, -dim.width * 0.51]}>
            <boxGeometry args={[0.12, 0.03, 0.02]} />
            <meshStandardMaterial 
              color="#c0c0c0"
              metalness={0.95}
              roughness={0.05}
            />
          </mesh>
        </group>
      ))}

      {/* Undercarriage shadow */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[dim.length * 1.3, dim.width * 1.3]} />
        <shadowMaterial opacity={0.4} />
      </mesh>

      {/* Spoiler for sedan type */}
      {type === 'sedan' && (
        <mesh position={[-dim.length * 0.45, 0.35 + dim.height * 0.45, 0]} castShadow>
          <boxGeometry args={[0.15, 0.05, dim.width * 0.85]} />
          <meshStandardMaterial 
            color={color}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      )}
    </group>
  )
}
